type LinkCardProps = {
  title: string;
  url: string;
  description?: string;
};

export default function LinkCard({ title, url, description }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-neutral-700 dark:bg-neutral-900"
    >
      <span className="block font-semibold">{title}</span>
      {description && (
        <span className="mt-0.5 block text-xs text-neutral-500 dark:text-neutral-400">
          {description}
        </span>
      )}
    </a>
  );
}
