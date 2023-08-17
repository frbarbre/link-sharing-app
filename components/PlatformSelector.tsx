'use client';
import { links } from '@/constants';
import { useState } from 'react';
import Image from 'next/image';
import { nanoid } from 'nanoid';
export default function PlatformSelector() {
  const [platform, setPlatform] = useState([links[0]]);
  const [selector, setSelector] = useState(false);
  return (
    <div>
      <div onClick={() => setSelector(!selector)}>
        {platform.map((platform) => (
          <div key={nanoid()} className="flex">
            <Image src={platform.img} alt={platform.name} />
            <p>{platform.name}</p>
          </div>
        ))}
      </div>
      {selector && (
        <div>
          {links.map((link) => (
            <div
              key={nanoid()}
              className="flex"
              onClick={() => {
                setPlatform([link]);
                setSelector(!selector);
              }}
            >
              <Image src={link.img} alt={link.name} />
              <p>{link.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
