"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 모두 0회
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(links.map((link) => [link.id, 0])),
  );

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져오기
  useEffect(() => {
    let cancelled = false;

    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { counts: Record<string, number> }) => {
        if (cancelled) return;
        // 응답이 오기 전에 이미 누른 클릭이 있을 수 있으니 서버 값보다 작아지지 않게 합침
        setCounts((prev) => {
          const next = { ...prev };
          for (const [id, count] of Object.entries(data.counts)) {
            next[id] = Math.max(count, prev[id] ?? 0);
          }
          return next;
        });
      })
      .catch((error) => console.error("클릭 수를 불러오지 못했습니다:", error));

    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (id: string) => {
    // 화면은 바로 +1
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    // 서버에 기록. keepalive로 페이지를 떠나도 요청이 끝까지 전송됨
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch((error) => console.error("클릭 수를 저장하지 못했습니다:", error));
  };

  return (
    <ul className="mt-10 flex w-full flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            emoji={link.emoji}
            title={link.title}
            url={link.url}
            description={link.description}
            clickCount={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
