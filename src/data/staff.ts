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
  }
];
