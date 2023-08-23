'use client';

import { navLinks } from '@/constants';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import NavLink from './NavLink';
import Preview from './Preview';
import SignOut from './SignOut';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar({ userId }: { userId: string | null }) {
  const pathname = usePathname();
  return (
    <header className="flex justify-between items-center bg-white p-[16px] pl-[24px] md:m-[24px] mb-0 md:mb-0 md:rounded-[12px]">
      {pathname.includes('/preview') ? (
        <>
          <Link href={'/'}>Back to Editor</Link>
          <button></button>
        </>
      ) : (
        <>
          <Link href={'/'}>
            <Image
              src={'/logo-devlinks-small.svg'}
              alt="logo"
              width={27}
              height={27}
              className="md:hidden"
            />
            <Image
              src={'/logo-devlinks-large.svg'}
              alt="logo"
              width={146}
              height={32}
              className="hidden md:block"
            />
          </Link>

          <nav>
            <ul className="flex md:gap-[16px]">
              {navLinks.map((link) => (
                <li key={nanoid()}>
                  <NavLink
                    name={link.name}
                    img={link.img}
                    imgActive={link.imgActive}
                    path={link.path}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <article className="flex gap-[12px]">
            <Preview userId={userId} />
            <SignOut />
          </article>
        </>
      )}
    </header>
  );
}
