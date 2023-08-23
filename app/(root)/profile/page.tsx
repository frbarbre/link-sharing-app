import Phone from '@/components/Phone';
import ProfileForm from '@/components/ProfileForm';
import { fetchUser } from '@/lib/actions/user.actions';
import { User } from '@/types';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo: User = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/welcome');

  return (
    <main className="flex gap-[24px] m-[16px] md:m-[24px]">
      <Phone userId={userInfo._id} clerkId={user.id} />
      <section className="bg-white rounded-[8px] w-full">
        <ProfileForm
          email={userInfo.email}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          image={userInfo.image}
          id={user.id}
        />
      </section>
    </main>
  );
}
