import { fetchLinks } from '@/lib/actions/link.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Link, User } from '@/types';
import Button from '@/components/Button';
import Image from 'next/image';
import LinkCard from '@/components/LinkCard';
import Phone from '@/components/Phone';
import { nanoid } from 'nanoid';

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo: User = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/welcome');

  const links: Link[] = await fetchLinks(userInfo._id);

  return (
    <main className="p-[16px] md:p-[24px] gap-[24px] flex">
      <Phone userId={userInfo._id} clerkId={user.id} isLinkPage={true} />
      <div className='w-full'>
        <section className="bg-white p-[24px] md:p-[40px] max-h-sm-phone md:max-h-phone overflow-scroll rounded-[8px]">
          <article>
            <h1 className="font-bold text-[24px] md:text-[32px] text-dark-gray">
              Customize your links
            </h1>
            <p className="text-medium-gray pt-[8px] mb-[40px]">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </article>
          <Button userId={userInfo?._id} />
          {links.length !== 0 ? (
            <article className="flex flex-col gap-[24px] mt-[24px]">
              {links?.map((link, index) => (
                <LinkCard
                  linkNumber={index + 1}
                  link={link.link}
                  platform={link.platform}
                  linkId={link._id}
                  key={nanoid()}
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
      </div>
    </main>
  );
}
