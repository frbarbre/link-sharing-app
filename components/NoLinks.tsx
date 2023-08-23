import Image from 'next/image';

export default function NoLinks() {
  return (
    <div className="bg-near-white w-full h-sm-no-link md:h-md-no-link md:max-h-[477px] mt-[24px] rounded-[8px]">
      <div className="max-w-[688px] mx-auto flex flex-col items-center justify-center h-full gap-[24px] px-[24px] md:px-[40px]">
        <Image
          src={'/illustration-empty.svg'}
          alt="illustration"
          width={250}
          height={200}
          className="w-[125px] md:w-[200px] object-contain"
        />
        <h2 className="text-dark-gray text-center text-[24px] leading-[36px] md:text-[32px] md:leading-[48px] font-bold">
          Let’s get you started
        </h2>
        <p className='text-medium-gray leading-[24px] text-center'>
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
}
