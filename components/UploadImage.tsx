import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import Image from 'next/image';
import { motion as m } from 'framer-motion';

interface Props {
  image: string;
  images: { fileUrl: string; fileKey: string }[];
  setImages: (images: { fileUrl: string; fileKey: string }[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: { message: string; isActive: boolean };
  setError: (error: { message: string; isActive: boolean }) => void;
  setIsSaved: (isSaved: boolean) => void;
}

export default function UploadImage({
  image,
  images,
  setImages,
  loading,
  setLoading,
  error,
  setError,
  setIsSaved,
}: Props) {
  return (
    <section className="flex justify-between md:items-center flex-col md:flex-row bg-near-white p-[20px] rounded-[8px]">
      <p className="text-medium-gray pb-[16px]">Profile Picture</p>
      <div className="flex md:items-center gap-[24px] flex-col md:flex-row">
        <div
          style={{
            backgroundImage: `url("${images[0]?.fileUrl || image}")`,
          }}
          className="relative w-[193px] aspect-square bg-cover bg-no-repeat bg-center bg-light-purple rounded-[12px]"
        >
          {!loading && (
            <>
              {image === '' && images.length === 0 ? (
                <div className="text-center absolute inset-0 flex items-center justify-center flex-col gap-[8px]">
                  <Image
                    src="/icon-upload-image.svg"
                    alt="upload-image"
                    width={32.5}
                    height={27.5}
                  />
                  <p className="text-primary-purple font-semibold">
                    +Upload Image
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/20 rounded-[12px] flex items-center justify-center flex-col gap-[8px]">
                  <Image
                    src="/icon-upload-image-white.svg"
                    alt="upload-image"
                    width={32.5}
                    height={27.5}
                  />
                  <p className="text-white font-semibold">Change Image</p>
                </div>
              )}
            </>
          )}
          {loading && (
            <m.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{
                rotate: 0,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 0.5,
                mass: 0.3,
              }}
            >
              <Image
                src={'/icon-loading.svg'}
                alt="loading-icon"
                width={40}
                height={40}
              />
            </m.div>
          )}
          <UploadButton<OurFileRouter>
            appearance={{
              button: {
                opacity: 0,
                position: 'absolute',
                inset: 0,
                backgroundColor: 'red',
                width: '100%',
                height: '100%',
              },
              allowedContent: {
                opacity: 0,
              },
            }}
            endpoint="media"
            onUploadProgress={() => {
              setLoading(true);
              setError({ message: '', isActive: false });
            }}
            onClientUploadComplete={(res) => {
              setLoading(false);
              setIsSaved(false);
              if (res) {
                setImages(res);
              }
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              setLoading(false);
              setError({
                message: "Image can't be larger than 4 MB",
                isActive: true,
              });
            }}
          />
        </div>
        <article className="max-w-[215px] text-medium-gray text-[12px] leading-[18px]">
          Image can be of any image format, but cannot be larger than 4MB
          {error.isActive && (
            <span className="text-red pt-[10px] block">
              Error: {error.message}
            </span>
          )}
        </article>
      </div>
    </section>
  );
}
