import { fetchUser } from '@/lib/actions/user.actions';
import { User } from '@/types';

export default async function Page({ params }: { params: { id: string } }) {
  const userInfo : User = await fetchUser(params.id);
  console.log(userInfo);

  return (
    <div>
      <h1>{userInfo.firstName} {userInfo.lastName}</h1>
    </div>
  );
}
