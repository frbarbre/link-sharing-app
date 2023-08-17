import { updateUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Welcome() {
  const user = await currentUser();
  if (!user) return null;

  await updateUser({
    email: user.emailAddresses[0].emailAddress || '',
    userId: user.id,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    image: user.imageUrl || '',
    onboarded: true,
  });

  return <Link href={'/'}>Welcome</Link>;
}
