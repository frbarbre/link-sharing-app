'use client';

import { updateUrl } from '@/lib/actions/link.actions';
import { Platforms } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import Message from './Message';

interface Props {
  platform: Platforms | 'empty';
  linkId: string;
  link: string;
}

export default function LinkInput({ platform, linkId, link }: Props) {
  const [value, setValue] = useState(link || '');
  const [isSaved, setIsSaved] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleBlur() {
    submitToDB();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  }
  async function submitToDB() {
    await updateUrl({ linkId: linkId, link: value, path: '/' });
  }

  const urlPlatform = platform.replace(' ', '');

  return (
    <div>
      <h2 className="text-dark-gray text-[12px] pb-[4px]">Link</h2>
      <div className="flex items-center border border-light-gray hover:shadow-purple-shadow transition-shadow px-5 py-3 bg-white rounded-[8px]">
        <Image
          src="/icon-link.svg"
          alt="link"
          width={15}
          height={15}
          className="mr-4"
        />

        <input
          type="text"
          placeholder={`e.g. https://www.${urlPlatform.toLowerCase()}.com/yourname`}
          className="w-full outline-none"
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
      </div>
      <Message isActive={isSaved} text='Your changes have been successfully saved!' image='/icon-changes-saved.svg' />
    </div>
  );
}
