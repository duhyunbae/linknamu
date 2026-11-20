type LinkCardProps = {
  emoji?: string;
  title: string;
  url: string;
  description?: string;
  clickCount: number;
  onClick?: () => void;
};

export default function LinkCard({
  emoji,
  title,
  url,
  description,
  clickCount,
  onClick,
}: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      // 휠 클릭(새 탭으로 열기)도 클릭으로 집계
      onAuxClick={(e) => {
        if (e.button === 1) onClick?.();
      }}
      className="group relative flex w-full items-center rounded-3xl border border-white/70 bg-white/45 px-5 py-4 shadow-[0_8px_30px_-12px_rgba(150,85,40,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-[0_14px_36px_-12px_rgba(150,85,40,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] dark:hover:bg-white/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* 왼쪽과 오른쪽 칸 너비를 같게 해서 제목이 카드 정중앙에 오도록 */}
      <span className="flex w-12 shrink-0 justify-start">
        {emoji && (
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 text-xl dark:bg-white/10"
          >
            {emoji}
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1 px-2 text-center">
        <span className="block text-[0.9375rem] font-semibold">{title}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-stone-500 dark:text-stone-400">
            {description}
          </span>
        )}
      </span>

      <span
        className="w-12 shrink-0 text-right text-xs tabular-nums text-stone-400 transition-colors duration-300 group-hover:text-stone-600 dark:text-stone-500 dark:group-hover:text-stone-300"
        aria-label={`클릭 ${clickCount.toLocaleString("ko-KR")}회`}
      >
        {clickCount.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
