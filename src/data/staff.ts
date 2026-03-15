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
    icon: `${import.meta.env.BASE_URL}Staff/koukunn.png`,
    youtubeUrl: "https://www.youtube.com/@PEXkoukunn",
    xUrl: "https://x.com/PEXkoukunn"
  },
  {
    id: "sunsun",
    name: "さんさん",
    message: "よろしく",
    icon: `${import.meta.env.BASE_URL}Staff/sunsun.jpg`,
    xUrl: "https://x.com/sunsun33_33?s=21"
  },
  {
    id: "Taijao",
    name: "タイジャオロウス@リーチ100マス入れてる人",
    message: "114514",
    icon: `${import.meta.env.BASE_URL}Staff/taijao.jpg`,
    youtubeUrl: "https://www.youtube.com/@taijaopvp",
    xUrl: "https://x.com/taijaopvp114514"
  },
  {
    id: "yx55407",
    name: "yx5",
    message: "よろしく！",
    icon: `${import.meta.env.BASE_URL}Staff/yx.jpg`,
    youtubeUrl: "https://youtube.com/@yx5-8639?si=4XoaFdYQn5m20SoG"
  },
  {
    id: "akimizu",
    name: "akimizu",
    message: "よろしくお願いします！",
    icon: `${import.meta.env.BASE_URL}Staff/akimizu.png`,
    youtubeUrl: "https://www.youtube.com/@ak1_syosinsya"
  } 
];
