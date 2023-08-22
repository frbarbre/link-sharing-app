'use client';

import { createLink } from "@/lib/actions/link.actions";
import { Platforms } from "@/types";

export default function Button({ userId }: { userId: string }) {

  async function updateLink() {
    
  }

  async function createNewLink() {
    await createLink({
      author: userId,
      link: 'https://www.github.com/graakjae',
      path: '/',
      platform: Platforms.facebook,
    });
  }

  return (
    <div
      onClick={createNewLink}
      className="border-primary-purple text-primary-purple w-full border hover:bg-light-purple cursor-pointer rounded-[8px]"
    >
      <p className="text-center p-2">+ Add new link</p>
    </div>
  );
}
