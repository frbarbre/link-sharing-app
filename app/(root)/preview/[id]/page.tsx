import { fetchLinks } from '@/lib/actions/link.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { Link, User } from '@/types';

export default async function Page({ params }: { params: { id: string } }) {
  const userInfo: User = await fetchUser(params.id);

  const links: Link[] = await fetchLinks(userInfo._id);

  return (
    <div>
      <h1>
        {userInfo.firstName} {userInfo.lastName}
      </h1>
    </div>
  );
}
