type LinkCardProps = {
  emoji?: string;
  title: string;
  url: string;
  description?: string;
};

export default function LinkCard({ emoji, title, url, description }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full items-center rounded-3xl border border-white/70 bg-white/45 px-5 py-4 shadow-[0_8px_30px_-12px_rgba(150,85,40,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-[0_14px_36px_-12px_rgba(150,85,40,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] dark:hover:bg-white/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {emoji && (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-xl dark:bg-white/10"
        >
          {emoji}
        </span>
      )}
      {/* 이모지 칸과 같은 너비만큼 오른쪽을 비워 제목이 카드 정중앙에 오도록 */}
      <span className="flex-1 px-3 text-center">
        <span className="block text-[0.9375rem] font-semibold">{title}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-stone-500 dark:text-stone-400">
            {description}
          </span>
        )}
      </span>
      {emoji && (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-stone-400 transition duration-300 group-hover:translate-x-0.5 group-hover:text-stone-600 dark:group-hover:text-stone-300 motion-reduce:transition-none"
        >
          ↗
        </span>
      )}
    </a>
  );
}
