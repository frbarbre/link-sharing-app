import { createLink, fetchLinks } from '@/lib/actions/link.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { UserButton, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Link, Platforms } from '@/types';
import Button from '@/components/Button';
import Image from 'next/image';
import LinkWrapper from '@/components/LinkWrapper';

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/welcome');

  const links: Link[] = await fetchLinks(userInfo._id);

  console.log(links);

  return (
    <main className="p-[40px]">
      <h2>Customize your links</h2>
      <p>
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <Button userId={userInfo?._id} />
      {links.length !== 0 ? (
        <>
          {links?.map((link) => (
            <LinkWrapper
              link={link.link}
              platform={link.platform}
              linkId={link._id}
            />
          ))}
        </>
      ) : (
        <div>
          <Image
            src={'/illustration-empty.svg'}
            alt="illustration"
            width={200}
            height={200}
          />
        </div>
      )}
    </main>
  );
}
