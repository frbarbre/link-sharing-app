'use client';
import { links } from '@/constants';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import ChevronDown from '../public/icon-chevron-down.svg';
import { Platforms } from '@/types';
import { updatePlatform } from '@/lib/actions/link.actions';

interface Props {
  platform: Platforms;
  linkId: string;
}

export default function PlatformSelector({ platform, linkId }: Props) {
  const [selector, setSelector] = useState(false);

  const currentPlatform = links.find((link) => link.name === platform);
  if (!currentPlatform) return null;

  async function setPlatform(input: Platforms) {
    updatePlatform({ linkId: linkId, platform: input, path: '/' });
  }

  console.log(platform);
  return (
    <div>
      <h2>Platform</h2>
      <div
        onClick={() => setSelector(!selector)}
        className="bg-white rounded-[8px]"
      >
        <div
          key={nanoid()}
          className="flex items-center justify-between w-full px-5 hover:shadow-purple-shadow cursor-pointer py-3 border border-light-gray"
        >
          <div className="flex items-center">
            <currentPlatform.img
              fill="#737373"
              src={currentPlatform.img}
              alt={currentPlatform.name}
              className="mr-4"
            />
            <p className="mt-[2px]">{currentPlatform.name}</p>
          </div>
          <ChevronDown
            stroke="#633CFF"
            src={ChevronDown}
            alt="chevron"
            className={`${selector ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
      {selector && (
        <div className="border border-light-gray px-5">
          {links.map((link) => (
            <div
              key={nanoid()}
              className="flex items-center w-full py-3 border-b cursor-pointer hover:bg-light-purple"
              onClick={() => {
                setPlatform(link.name);
                setSelector(!selector);
              }}
            >
              <link.img
                fill={`${link.name === platform ? '#633CFF' : '#737373'}`}
                src={link.name}
                alt={link.name}
                className="mr-4"
              />
              <p
                className={`text-${
                  link.name === platform ? '[#633CFF]' : '[#737373]'
                } mt-[2px]`}
              >
                {link.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
