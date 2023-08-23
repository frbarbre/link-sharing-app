import { fetchLinks } from '@/lib/actions/link.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Link, User } from '@/types';
import Button from '@/components/Button';
import Image from 'next/image';
import LinkCard from '@/components/LinkCard';

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo: User = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/welcome');

  const links: Link[] = await fetchLinks(userInfo._id);

  console.log(links);

  return (
    <main className="p-[16px] md:p-[24px]">
      <section className='bg-white p-[24px] md:p-[40px]'>
        <h1>Customize your links</h1>
        <p>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button userId={userInfo?._id} />
        {links.length !== 0 ? (
          <article className='flex flex-col gap-[24px] mt-[24px]'>
            {links?.map((link, index) => (
              <LinkCard
                linkNumber={index + 1}
                link={link.link}
                platform={link.platform}
                linkId={link._id}
              />
            ))}
          </article>
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
      </section>
    </main>
  );
}
