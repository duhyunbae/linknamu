// 보여 주기용 더미 데이터입니다. 실제 내용은 이 파일만 고치면 됩니다.

export type LinkItem = {
  id: string;
  emoji?: string;
  title: string;
  url: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "배선생",
  bio: "Product Manager | Ph.D. in EE | Twins Father",
  imageUrl: "/me.jpg",
  links: [
    {
      id: "github",
      emoji: "💻",
      title: "깃허브",
      url: "https://github.com/duhyunbae",
    },
    {
      id: "blog",
      emoji: "✍️",
      title: "블로그",
      url: "https://blog.naver.com/duhyun",
    },
    {
      id: "linkedin",
      emoji: "💼",
      title: "링크드인",
      url: "https://www.linkedin.com/in/두현-배-7631149b",
    },
  ],
};
