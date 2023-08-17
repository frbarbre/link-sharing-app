'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface Props {
  name: string;
  img: string;
  imgActive: string;
  path: string;
}

export default function NavLink({ name, img, imgActive, path }: Props) {
  const pathname = usePathname();

  return (
    <article>
      <Image
        src={pathname === path ? imgActive : img}
        alt={name}
        width={20}
        height={20}
      />
    </article>
  );
}
