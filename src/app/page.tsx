import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-6 pb-16 pt-16 sm:pt-24">
      <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />

      <ul className="mt-10 flex w-full flex-col gap-4 sm:gap-5">
        {profile.links.map((link) => (
          <li key={link.id}>
            <LinkCard
              emoji={link.emoji}
              title={link.title}
              url={link.url}
              description={link.description}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
