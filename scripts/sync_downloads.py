"""Refresh the static download catalog from GitHub releases and pack manifests."""
import argparse
import json
import os
from pathlib import Path
import re
import struct
import urllib.request
import zipfile
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]


def release_resource(presentation, source, release):
    if release.get('draft') or release.get('prerelease') or not release.get('tag_name'):
        raise ValueError('Expected a published stable GitHub release')
    repository = source['repository']
    tag = release['tag_name']
    assets = [asset for asset in release.get('assets', []) if
              re.fullmatch(source['assetPattern'], asset['name']) and asset.get('state') == 'uploaded']
    if len(assets) != 1:
        raise ValueError(f'{repository}: expected exactly one download bundle, got {len(assets)}')
    asset = assets[0]
    href = asset['browser_download_url']
    if not href.startswith(f'https://github.com/{repository}/releases/download/'):
        raise ValueError('Unexpected release asset URL')
    release_url = release['html_url']
    if not release_url.startswith(f'https://github.com/{repository}/releases/tag/'):
        raise ValueError('Unexpected release URL')
    from urllib.parse import quote
    guide = f'https://github.com/{repository}/blob/{quote(tag, safe="")}/{source["guide"]}'
    return {
        **presentation, 'version': tag.removeprefix('v'), 'publishedAt': release['published_at'],
        'releaseUrl': release_url,
        'shareTitle': f'{presentation["shareTitle"]} ({tag})',
        'tags': [*presentation['tags'], tag],
        'note': f'{tag} の導入条件と更新内容は、リリース情報と導入ガイドをご確認ください。',
        'links': [
            {'label': f'最新版をダウンロード ({tag}) ↗', 'href': href, 'external': True},
            {'label': '導入ガイド', 'href': guide, 'external': True},
            {'label': 'リリース情報', 'href': release_url, 'external': True},
        ],
    }


def pack_resource(presentation, source, pack_path):
    with zipfile.ZipFile(pack_path) as archive:
        manifest = json.loads(archive.read('manifest.json').decode('utf-8-sig'))
    parts = manifest['header']['version']
    if len(parts) != 3 or any(type(part) is not int or part < 0 for part in parts):
        raise ValueError('Invalid resource-pack version')
    version = '.'.join(map(str, parts))
    return {**presentation, 'version': version,
            'eyebrow': f'{presentation["eyebrow"]} / v{version}',
            'shareTitle': f'{presentation["shareTitle"]} (v{version})',
            'tags': [*presentation['tags'], f'v{version}'], 'links': source['links']}


def generate():
    sources = json.loads((ROOT / 'src/data/download-sources.json').read_text(encoding='utf-8-sig'))
    resources = []
    for item in sources:
        source = item['source']
        presentation = {key: value for key, value in item.items() if key != 'source'}
        if not re.fullmatch(r'[a-z0-9-]+', item['id']) or any(r['id'] == item['id'] for r in resources):
            raise ValueError('Resource IDs must be unique URL slugs')
        if source['type'] == 'github-release':
            repository = source['repository']
            if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+', repository):
                raise ValueError('Invalid repository name')
            headers = {'Accept': 'application/vnd.github+json', 'User-Agent': 'PEXserver-download-catalog'}
            if os.environ.get('GITHUB_TOKEN'):
                headers['Authorization'] = 'Bearer ' + os.environ['GITHUB_TOKEN']
            request = urllib.request.Request(f'https://api.github.com/repos/{repository}/releases/latest', headers=headers)
            with urllib.request.urlopen(request, timeout=30) as response:
                release = json.load(response)
            resource = release_resource(presentation, source, release)
        elif source['type'] == 'local-pack':
            pack = (ROOT / source['path']).resolve()
            if not pack.is_relative_to(ROOT / 'public'):
                raise ValueError('Pack must be inside public/')
            resource = pack_resource(presentation, source, pack)
        else:
            raise ValueError('Unknown download source')
        image = (ROOT / 'public' / resource['image']).resolve()
        if not image.is_relative_to(ROOT / 'public'):
            raise ValueError('Image must be inside public/')
        png = image.read_bytes()
        if png[:8] != b'\x89PNG\r\n\x1a\n':
            raise ValueError('Expected a PNG resource icon')
        resource['imageWidth'], resource['imageHeight'] = struct.unpack('>II', png[16:24])
        resources.append(resource)
    return {'schemaVersion': 1, 'updatedAt': datetime.now(timezone.utc).isoformat(), 'resources': resources}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true', help='Validate sources without writing files')
    args = parser.parse_args()
    catalog = generate()  # Resolve every source before changing either snapshot.
    if not args.check:
        payload = json.dumps(catalog, ensure_ascii=False, indent=2) + '\n'
        for relative in ['src/data/generated/downloads.json', 'public/downloads.json']:
            target = ROOT / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            temporary = target.with_suffix('.json.tmp')
            temporary.write_text(payload, encoding='utf-8')
            temporary.replace(target)
    for resource in catalog['resources']:
        print(f'{resource["name"]}: {resource["version"]}')


if __name__ == '__main__':
    main()
