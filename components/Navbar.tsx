'use client';

import { navLinks } from '@/constants';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import NavLink from './NavLink';
import Preview from './Preview';
import SignOut from './SignOut';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import Message from './Message';

export default function Navbar({ userId }: { userId: string | null }) {
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);

  function handleCopy() {
    const baseUrl = 'https://devlinks.frederikbarbre.dk';
    const fullUrl = baseUrl + pathname;
    navigator.clipboard.writeText(fullUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  return (
    <header
      className={`flex justify-between items-center bg-white p-[16px] md:m-[24px] mb-0 md:mb-0 md:rounded-[12px] ${
        pathname.includes('/preview') ? 'pl-[16px]' : 'pl-[24px]'
      }`}
    >
      {pathname.includes('/preview') ? (
        <>
          <Link
            href={'/'}
            className="px-[27px] py-[11px] border border-primary-purple rounded-[8px] text-primary-purple font-semibold leading-[24px] hover:bg-light-purple transition-color"
          >
            Back to Editor
          </Link>
          <button
            className="bg-primary-purple rounded-[8px] px-[27px] py-[11px] text-white font-semibold hover:bg-pale-purple transition-colors"
            onClick={handleCopy}
          >
            Share Link
          </button>
          <Message
            image="/icon-link-copied-to-clipboard.svg"
            text="The link has been copied to your clipboard!"
            isActive={isCopied}
          />
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
