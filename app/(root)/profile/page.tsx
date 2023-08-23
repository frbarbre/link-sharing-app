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
    <main>
      <section className="bg-white m-[16px] md:m-[24px] rounded-[8px]">
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
