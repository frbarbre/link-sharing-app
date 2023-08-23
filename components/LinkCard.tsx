'use client';

import PlatformSelector from './PlatformSelector';
import LinkInput from './LinkInput';
import { Platforms } from '@/types';
import { deleteLink } from '@/lib/actions/link.actions';

export default function LinkCard({
  link,
  platform,
  linkId,
  linkNumber,
}: {
  link: string;
  platform: Platforms | "empty";
  linkId: string;
  linkNumber: number;
}) {

  async function handleRemove() {
    deleteLink(linkId, '/');
  }

  return (
    <div className="bg-near-white rounded-[8px] p-[20px]">
      <section className='flex justify-between'>
        <h2 className='font-bold text-medium-gray'>Link #{linkNumber}</h2>
        <h2 onClick={handleRemove} className='cursor-pointer text-medium-gray pb-[12px] hover:underline'>Remove</h2>
      </section>
      <article className='flex flex-col gap-[12px]'>
        <PlatformSelector platform={platform} linkId={linkId} />
        <LinkInput platform={platform} linkId={linkId} link={link} />
      </article>
    </div>
  );
}
