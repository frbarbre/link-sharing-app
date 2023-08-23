import { fetchLinks } from '@/lib/actions/link.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { Link, User } from '@/types';
import Image from 'next/image';

export default async function Phone({
  userId,
  clerkId,
  isLinkPage,
}: {
  userId: string;
  clerkId: string;
  isLinkPage?: boolean
}) {
  const userInfo: User = await fetchUser(clerkId);
  const links: Link[] = await fetchLinks(userId);

  const emptyBoxes = 5 - links.length
  let emptyBoxArray = []

  for (let i = 0; i < emptyBoxes; i++) {
    emptyBoxArray.push("box")
  }

  console.log(emptyBoxArray)

  return (
    <div className="max-h-phone bg-white hidden w-full max-w-[560px] md:flex items-center justify-center rounded-[8px] p-[40px]">
      <div className="relative h-full aspect-[307/631]">
        <Image src={'/illustration-empty-phone.svg'} alt="phone" fill />
        <article className="absolute inset-0 flex flex-col justify-between">
          <section>
            {userInfo.image !== '' ? <div>Image</div> : <div>No Image</div>}
          </section>
          <section>
            {links.map((link, index) => (
              <>
                {index < 5 && (
                  <div>
                    <h2>{link.platform}</h2>
                  </div>
                )}
              </>
            ))}
            {links.length < 5 && isLinkPage && (
              <>
              {emptyBoxArray.map(() => (
                <div>BOX</div>
              ))}
              </>
            )}
          </section>
        </article>
      </div>
    </div>
  );
}
