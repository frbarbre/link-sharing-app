'use client';

import { linksData } from '@/constants';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import ChevronDown from '../public/icon-chevron-down.svg';
import { Platforms } from '@/types';
import { updatePlatform } from '@/lib/actions/link.actions';

interface Props {
  platform: Platforms | 'empty';
  linkId: string;
}

export default function PlatformSelector({ platform, linkId }: Props) {
  const [selector, setSelector] = useState(false);

  const currentPlatform = linksData.find((link) => link.name === platform);

  async function setPlatform(input: Platforms) {
    updatePlatform({ linkId: linkId, platform: input, path: '/' });
  }

  return (
    <div>
      <h2 className="text-dark-gray text-[12px] pb-[4px]">Platform</h2>
      <div
        onClick={() => setSelector(!selector)}
        className="bg-white rounded-[8px] relative"
      >
        <div
          key={nanoid()}
          className="flex items-center justify-between w-full px-5 hover:shadow-purple-shadow transition-shadow cursor-pointer py-3 border border-light-gray rounded-[8px]"
        >
          <div className="flex items-center">
            {currentPlatform && (
              <currentPlatform.img fill="#737373" className="mr-4" />
            )}
            <p className="mt-[2px]">
              {currentPlatform?.name || 'Select a Platform'}
            </p>
          </div>
          <ChevronDown
            stroke="#633CFF"
            className={`${selector ? 'rotate-180' : ''}`}
          />
        </div>
        {selector && (
          <div className="border border-light-gray absolute w-full bg-white top-[58.8px] shadow-box max-h-[203.2px] overflow-y-scroll z-50 rounded-[8px]">
            {linksData.map((link) => (
              <div
                key={nanoid()}
                className="flex items-center w-full px-5 py-3 border-b cursor-pointer hover:bg-light-purple"
                onClick={() => {
                  setPlatform(link.name);
                  setSelector(!selector);
                }}
              >
                <link.img
                  fill={`${link.name === platform ? '#633CFF' : '#737373'}`}
                  className="mr-4"
                />
                <p
                  className={`${
                    link.name === platform ? 'text-[#633CFF]' : 'text-[#737373]'
                  } mt-[2px]`}
                >
                  {link.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
