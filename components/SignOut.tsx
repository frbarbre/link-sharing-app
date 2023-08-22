'use client';

import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignOut() {
  const { signOut } = useClerk();

  return (
    <button
      onClick={() => signOut()}
      className="border px-[16px] py-[11px] hover:bg-light-purple rounded-[8px] border-primary-purple"
    >
      <Image
        src={'/icon-logout.svg'}
        alt="sign-out-icon"
        width={20}
        height={20}
      />
    </button>
  );
}
