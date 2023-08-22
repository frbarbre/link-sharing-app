import Image from 'next/image';
import Link from 'next/link';

export default async function Preview({ userId }: { userId: string | null }) {
  return (
    <Link href={`/preview/${userId}`}>
      <div className="px-[16px] md:px-[27px] py-[11px] rounded-[8px] border border-primary-purple bg-white hover:bg-light-purple transition-colors">
        <Image
          src={'/icon-preview-header.svg'}
          alt="preview-icon"
          width={20}
          height={20}
          className="md:hidden"
        />
        <p className="hidden md:block text-primary-purple font-semibold">
          Preview
        </p>
      </div>
    </Link>
  );
}
