import json
from pathlib import Path
import tempfile
import unittest
import zipfile
from sync_downloads import release_resource, pack_resource

class DownloadGenerationTests(unittest.TestCase):
    def setUp(self):
        self.base = {'id': 'cooldown-animation', 'name': 'CooldownAnimation', 'shareTitle': 'Cooldown Animation', 'tags': ['Geyser']}
        self.source = {'repository': 'owner/project', 'assetPattern': r'^GeyserCooldownAnimation-[0-9].*\.zip$', 'guide': 'INSTALL.md'}
        self.release = {'tag_name': 'v9.1.2', 'published_at': '2026-10-01T00:00:00Z', 'html_url': 'https://github.com/owner/project/releases/tag/v9.1.2', 'assets': [
            {'name': 'GeyserCooldownAnimation-9.1.2.zip', 'state': 'uploaded', 'browser_download_url': 'https://github.com/owner/project/releases/download/v9.1.2/GeyserCooldownAnimation-9.1.2.zip'},
            {'name': 'GeyserCooldownAnimation-9.1.2.jar', 'state': 'uploaded', 'browser_download_url': 'https://github.com/owner/project/releases/download/v9.1.2/GeyserCooldownAnimation-9.1.2.jar'}]}
    def test_new_release_updates_links_tags_and_share_title(self):
        resource = release_resource(self.base, self.source, self.release)
        self.assertEqual(resource['version'], '9.1.2')
        self.assertTrue(resource['links'][0]['href'].endswith('9.1.2.zip'))
        self.assertEqual(resource['links'][1]['href'], 'https://github.com/owner/project/blob/v9.1.2/INSTALL.md')
        self.assertIn('v9.1.2', resource['tags'])
        self.assertIn('v9.1.2', resource['shareTitle'])
    def test_missing_or_ambiguous_bundle_rejects_update(self):
        for assets in [[], [self.release['assets'][0]] * 2]:
            with self.subTest(assets=len(assets)), self.assertRaises(ValueError):
                release_resource(self.base, self.source, {**self.release, 'assets': assets})
    def test_draft_and_prerelease_rejected(self):
        for key in ['draft', 'prerelease']:
            with self.subTest(key=key), self.assertRaises(ValueError):
                release_resource(self.base, self.source, {**self.release, key: True})
    def test_unexpected_download_host_rejected(self):
        release = {**self.release, 'assets': [{**self.release['assets'][0], 'browser_download_url': 'https://example.com/file.zip'}]}
        with self.assertRaises(ValueError): release_resource(self.base, self.source, release)
    def test_pack_version_is_read_from_archive(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'pack.mcpack'
            with zipfile.ZipFile(path, 'w') as archive:
                archive.writestr('manifest.json', json.dumps({'header': {'version': [8, 3, 7]}}))
            resource = pack_resource({'eyebrow': 'RESOURCE PACK', 'shareTitle': 'Glass', 'tags': ['Bedrock']}, {'links': []}, path)
            self.assertEqual(resource['version'], '8.3.7')
            self.assertIn('v8.3.7', resource['eyebrow'])
            self.assertIn('v8.3.7', resource['shareTitle'])

if __name__ == '__main__': unittest.main()
