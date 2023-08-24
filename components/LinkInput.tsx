'use client';

import { updateUrl } from '@/lib/actions/link.actions';
import { Platforms } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  platform: Platforms | 'empty';
  linkId: string;
  link: string;
}

export default function LinkInput({ platform, linkId, link }: Props) {
  const [value, setValue] = useState(link || '');
  const [error, setError] = useState<{ message: string; isActive: boolean }>({
    message: '',
    isActive: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    if (value.includes('https://') || value.includes('http://')) {
      setError({
        ...error,
        isActive: false,
      });
    } else {
      setError({
        message: 'Please check the url',
        isActive: true,
      });
    }
  }

  function handleBlur() {
    submitToDB();
  }
  async function submitToDB() {
    if (value === '') {
      setError({
        message: "Can't be empty",
        isActive: true,
      });
      console.log('empty');
    } else if (value.includes('https://') || value.includes('http://')) {
      await updateUrl({ linkId: linkId, link: value, path: '/' });
      setError({
        ...error,
        isActive: false,
      });
    } else {
      setError({
        message: 'Please check the URL',
        isActive: true,
      });
      console.log('not a valid url');
    }
  }

  const urlPlatform = platform.replace(' ', '');

  return (
    <div>
      <article className="flex gap-6">
        <h2 className="text-dark-gray text-[12px] pb-[4px]">Link</h2>
      </article>
      <div
        className={`relative flex items-center border ${
          error.isActive ? 'border-red text-red' : 'border-light-gray'
        } hover:shadow-purple-shadow transition-shadow px-5 py-3 bg-white rounded-[8px]`}
      >
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
        {error.isActive && (
          <p className="absolute right-[10px] top-[50%] translate-y-[-50%] text-[12px] text-red">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}
