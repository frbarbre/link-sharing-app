import { Link, Platforms } from '@/types';
import Image from 'next/image';

export default function PlatformLink({
  link,
  currentPlatform,
  isPreviewPage
}: {
  link: Link;
  currentPlatform?: {
    name: Platforms | 'empty';
    img: any;
    backgroundColor: string;
  };
  isPreviewPage?: boolean
}) {
  return (
    <a
      href={link.platform === 'empty' ? '' : link.link}
      target="_blank"
      className={`${isPreviewPage ? "h-[56px]" : "h-[15%]"} rounded-[8px] ${
        link.platform === Platforms.frontendMentor && 'border border-light-gray'
      } flex items-center px-[16px] justify-between ${
        link.platform !== 'empty' && 'cursor-pointer'
      }`}
      style={{
        backgroundColor:
          link.platform === 'empty'
            ? '#D9D9D9'
            : currentPlatform?.backgroundColor,
      }}
    >
      <>
        {link.platform !== 'empty' && (
          <>
            <div className="flex gap-[8px] items-center">
              {link.platform === Platforms.frontendMentor ? (
                <Image
                  src={'/icon-frontend-mentor-color.svg'}
                  alt="logo"
                  width={14}
                  height={16}
                />
              ) : (
                <>{currentPlatform && <currentPlatform.img fill="#FFF" />}</>
              )}
              <h2
                className={`text-[12px] leading-[12px] ${
                  link.platform === Platforms.frontendMentor
                    ? 'text-dark-gray'
                    : 'text-white'
                }`}
              >
                {link.platform}
              </h2>
            </div>
            <Image
              src={
                link.platform === Platforms.frontendMentor
                  ? '/icon-arrow-right-gray.svg'
                  : '/icon-arrow-right.svg'
              }
              alt="arrow-icon"
              width={16}
              height={16}
            />
          </>
        )}
      </>
    </a>
  );
}
