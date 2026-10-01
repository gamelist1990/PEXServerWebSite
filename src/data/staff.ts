import { SITE_BASE_PATH } from "../app/sitePaths";
export type StaffMember = {
  id: string;
  name: string;
  message: string;
  icon: string;
  youtubeUrl?: string;
  xUrl?: string;
};

export const staffMembers: StaffMember[] = [
  {
    id: "koukunn",
    name: "こう君@鯖主",
    message: "原神楽しいよ!!みんなやろう！",
    icon: `${SITE_BASE_PATH}Staff/koukunn.png`,
    youtubeUrl: "https://www.youtube.com/@PEXkoukunn",
    xUrl: "https://x.com/PEXkoukunn"
  },
  {
    id: "sunsun",
    name: "さんさん",
    message: "よろしく",
    icon: `${SITE_BASE_PATH}Staff/sunsun.jpg`,
    xUrl: "https://x.com/sunsun33_33?s=21"
  },
  {
    id: "Taijao",
    name: "タイジャオロウス@リーチ100マス入れてる人",
    message: "114514",
    icon: `${SITE_BASE_PATH}Staff/taijao.jpg`,
    youtubeUrl: "https://www.youtube.com/@taijaopvp",
    xUrl: "https://x.com/taijaopvp114514"
  },
  {
    id: "yx55407",
    name: "yx5",
    message: "よろしく！",
    icon: `${SITE_BASE_PATH}Staff/yx.jpg`,
    youtubeUrl: "https://youtube.com/@yx5-8639?si=4XoaFdYQn5m20SoG",
    xUrl: "https://x.com/yx5_8639"
  },
  {
    id: "akimizu",
    name: "akimizu",
    message: "よろしくお願いします！",
    icon: `${SITE_BASE_PATH}Staff/akimizu.png`,
    youtubeUrl: "https://www.youtube.com/@ak1_syosinsya"
  },
  {
    id: "Lupalupadayo",
    name: "ルパー",
    message: "よろだよー 鳴潮復帰したぜ( ✌︎'ω')✌︎",
    icon: `${SITE_BASE_PATH}Staff/lupa.jpg`,
    xUrl: "https://x.com/lupalupanannda"
  }
];
