import { linksData } from '@/constants';
import { fetchLinks } from '@/lib/actions/link.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { Link, User } from '@/types';
import Image from 'next/image';
import PlatformLink from './PlatformLink';
import { nanoid } from 'nanoid';

export default async function Phone({
  userId,
  clerkId,
  isLinkPage,
}: {
  userId: string;
  clerkId: string;
  isLinkPage?: boolean;
}) {
  const userInfo: User = await fetchUser(clerkId);
  const links: Link[] = await fetchLinks(userId);

  const emptyBoxes = 5 - links.length;
  let emptyBoxArray = [];

  for (let i = 0; i < emptyBoxes; i++) {
    emptyBoxArray.push('box');
  }

  return (
    <div className="max-h-md-phone bg-white hidden w-full max-w-[560px] lg:flex items-center justify-center rounded-[8px] p-[40px]">
      <div className="relative h-full aspect-[307/631]">
        <Image src={'/illustration-empty-phone.svg'} alt="phone" fill />
        <article className="absolute inset-0 flex flex-col p-[5%] pt-[20%] items-center w-full">
          <section className="w-full flex flex-col items-center gap-[5px]">
            {userInfo.image !== '' ? (
              <div className="relative aspect-square rounded-full w-[40%] mb-[4%]">
                <Image
                  src={userInfo.image}
                  alt="profile photo"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-full w-[40%] mx-auto bg-light-gray mb-[4%]" />
            )}

            {userInfo.firstName !== '' && userInfo.lastName !== '' ? (
              <h3 className="font-semibold text-[16px]">
                {userInfo.firstName} {userInfo.lastName}
              </h3>
            ) : (
              <div className="h-[16px] bg-light-gray rounded-full w-[50%] mt-[1.5%]" />
            )}

            {userInfo.email !== '' ? (
              <p className="text-medium-gray text-[12px]">{userInfo.email}</p>
            ) : (
              <div className="h-[8px] bg-light-gray rounded-full w-[50%] mt-[1.5%]" />
            )}
          </section>
          <section className="flex flex-col pt-[15%] w-full justify-start h-full gap-[3%] px-[5%]">
            {links.map((link, index) => {
              let currentPlatform = linksData.find(
                (data) => data.name === link.platform
              );
              return (
                <>
                  {index < 5 && (
                    <PlatformLink
                      currentPlatform={currentPlatform}
                      link={link}
                      key={nanoid()}
                    />
                  )}
                </>
              );
            })}
            {links.length < 5 && isLinkPage && (
              <>
                {emptyBoxArray.map(() => (
                  <div className="h-[15%] bg-light-gray rounded-[8px]" />
                ))}
              </>
            )}
          </section>
        </article>
      </div>
    </div>
  );
}
