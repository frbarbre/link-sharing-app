'use client';
import Image from 'next/image';
import PlatformSelector from './PlatformSelector';
import LinkInput from './LinkInput';
import { Platforms } from '@/types';

export default function LinkWrapper({link, platform, linkId} : {link: string, platform: Platforms, linkId: string}) {
  return (
    <div className="bg-near-white">
      <div>
        <h2>Link #1</h2>
        <h2>Remove</h2>
      </div>
      <article>
        <PlatformSelector platform={platform} linkId={linkId} />
        <LinkInput platform={platform} linkId={linkId} link={link} />
      </article>
    </div>
  );
}
