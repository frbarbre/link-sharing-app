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
        <section className="bg-white p-[24px] md:p-[40px] max-h-sm-screen md:max-h-md-screen overflow-scroll rounded-[8px]">
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
        <section className="h-[78px] md:h-[94px] flex justify-end items-center px-[16px] md:px-[40px] border-t bg-white rounded-b-[8px]">
          <button
            className={`w-full h-[46px] font-semibold px-[27px] transition-colors rounded-[8px] md:w-max bg-white border-primary-purple/25 border text-primary-purple/25 cursor-not-allowed`}
            type="submit"
          >
            Autosaved
          </button>
        </section>
      </div>
    </main>
  );
}
