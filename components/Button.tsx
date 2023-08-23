'use client';

import { createLink } from "@/lib/actions/link.actions";

export default function Button({ userId }: { userId: string }) {

  async function createNewLink() {
    await createLink({
      author: userId,
      link: '',
      path: '/',
      platform: "empty",
    });
  }

  return (
    <div
      onClick={createNewLink}
      className="border-primary-purple text-primary-purple w-full border hover:bg-light-purple cursor-pointer rounded-[8px]"
    >
      <p className="text-center font-semibold p-2">+ Add new link</p>
    </div>
  );
}
