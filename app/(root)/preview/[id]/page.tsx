import PlatformLink from '@/components/PlatformLink';
import { linksData } from '@/constants';
import { fetchLinks } from '@/lib/actions/link.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { Link, User } from '@/types';
import { nanoid } from 'nanoid';

export default async function Page({ params }: { params: { id: string } }) {
  const userInfo: User = await fetchUser(params.id);

  const links: Link[] = await fetchLinks(userInfo._id);

  return (
    <div className="bg-white md:bg-transparent h-full min-h-sm-preview md:min-h-md-preview flex items-center justify-center p-[16px]">
      <div className="absolute top-0 left-0 right-0 h-[357px] bg-primary-purple z-[-1] rounded-b-[32px] hidden md:block" />
      <article className="bg-white max-w-[349px] mx-auto w-full flex flex-col items-center rounded-[24px] px-[56px] gap-[36px] py-[48px] md:shadow-lg">
        <section className="flex flex-col items-center">
          <img
            src={userInfo.image}
            alt="profile-photo"
            width={304}
            height={304}
            className="aspect-square rounded-full object-cover w-[104px] border-[4px] border-primary-purple mb-[21px]"
          />
          <h1 className="text-dark-gray text-[24px] font-bold text-center pb-[8px]">
            {userInfo.firstName} {userInfo.lastName}
          </h1>
          <p className="text-medium-gray text-[14px]">{userInfo.email}</p>
        </section>
        <section className="w-full flex flex-col gap-[12px]">
          {links.map((link) => {
            const currentPlatform = linksData.find(
              (data) => data.name === link.platform
            );
            return (
              <>
                {link.platform !== 'empty' && (
                  <PlatformLink
                    link={link}
                    currentPlatform={currentPlatform}
                    key={nanoid()}
                    isPreviewPage={true}
                  />
                )}
              </>
            );
          })}
        </section>
      </article>
    </div>
  );
}
