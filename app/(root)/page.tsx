import { createLink } from '@/lib/actions/link.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { UserButton, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import AddLinks from '@/components/AddLinks';

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/welcome');

  await createLink({
    author: userInfo?._id,
    link: 'https://www.github.com/graakjae',
    path: '/',
    platform: 'Github',
  });

  return (
    <main>
      <UserButton />
      <AddLinks/>
    </main>
  );
}
