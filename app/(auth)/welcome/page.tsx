import { fetchUser, updateUser } from '@/lib/actions/user.actions';
import { User } from '@/types';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default async function Welcome() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo: User = await fetchUser(user.id);

  await updateUser({
    email: user.emailAddresses[0].emailAddress || '',
    userId: user.id,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    image: user.imageUrl || '',
    onboarded: true,
  });

  return (
    <section className="w-full max-w-[450px] mx-auto">
      <article className="bg-white mx-[24px] rounded-[8px] flex flex-col gap-[6px] items-center p-[24px]">
        <Image
          src={'/logo-devlinks-large.svg'}
          alt="logo"
          width={160}
          height={160}
        />
        <div className='flex flex-col items-center gap-[2px] py-[24px]'>
          <Image
            src={user.imageUrl}
            alt="profile photo"
            width={120}
            height={120}
            className="rounded-full aspect-square object-cover"
          />
          <h1 className="font-bold text-[24px] md:text-[32px] text-dark-gray pt-[24px]">
            Hello{' '}
            {user.firstName !== ''
              ? user.firstName
              : user.username !== ''
              ? user.username
              : ''}
          </h1>
          <p className="text-medium-gray pt-[4px]">
            Are you ready to use Devlinks?
          </p>
        </div>
        <Link
          className="w-full h-[48px] bg-primary-purple text-white font-semibold flex items-center justify-center rounded-[8px] hover:bg-pale-purple transition-colors"
          href={'/'}
        >
          Get Started
        </Link>
      </article>
    </section>
  );
}
