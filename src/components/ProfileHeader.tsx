import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 따뜻한 그림자로 살짝 떠 있는 느낌 */}
      <div className="rounded-full bg-white/70 p-1.5 shadow-[0_18px_40px_-14px_rgba(150,85,40,0.45),0_2px_6px_rgba(150,85,40,0.10)] ring-1 ring-white/80 dark:bg-white/10 dark:ring-white/10 dark:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)]">
        <Image
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          width={144}
          height={144}
          priority
          className="h-32 w-32 rounded-full object-cover sm:h-36 sm:w-36"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone-500 dark:text-stone-400">
        {bio}
      </p>
    </header>
  );
}
