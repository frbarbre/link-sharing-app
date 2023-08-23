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
  platform: Platforms;
  linkId: string;
  linkNumber: number;
}) {
  async function removeHandler() {
    deleteLink(linkId, '/');
  }

  return (
    <div className="bg-near-white md:p-[20px]">
      <section className='flex justify-between'>
        <h2>Link #{linkNumber}</h2>
        <h2 onClick={removeHandler}>Remove</h2>
      </section>
      <article>
        <PlatformSelector platform={platform} linkId={linkId} />
        <LinkInput platform={platform} linkId={linkId} link={link} />
      </article>
    </div>
  );
}
