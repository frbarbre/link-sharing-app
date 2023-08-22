'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface Props {
  name: string;
  img: string;
  imgActive: string;
  path: string;
}

export default function NavLink({ name, img, imgActive, path }: Props) {
  const pathname = usePathname();
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <Link
      href={path}
      className={`${
        pathname === path ? 'bg-light-purple' : ''
      } w-max group flex gap-[8px] px-[27px] py-[11px] rounded-[8px]`}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <Image
        src={isMouseOver ? imgActive : pathname === path ? imgActive : img}
        alt={name}
        width={20}
        height={20}
      />
      <p
        className={`${
          pathname === path ? 'text-primary-purple' : 'text-medium-gray'
        } font-semibold hidden md:block group-hover:text-primary-purple transition-colors`}
      >
        {name}
      </p>
    </Link>
  );
}
