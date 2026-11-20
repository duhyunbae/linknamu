// 보여 주기용 더미 데이터입니다. 실제 내용은 이 파일만 고치면 됩니다.

export type LinkItem = {
  id: string;
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
  name: "김클로",
  bio: "세계 최강 바이브코더",
  imageUrl: "/profile-placeholder.svg",
  links: [
    {
      id: "github",
      title: "GitHub",
      url: "https://github.com/",
      description: "코드 저장소",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      url: "https://www.linkedin.com/",
      description: "경력 및 이력",
    },
    {
      id: "blog",
      title: "Blog",
      url: "https://example.com/",
      description: "개발 블로그",
    },
  ],
};
