import type { User } from '@erikdakoda/database';
import Image from 'next/image';

type Props = {
  user: Pick<User, 'name' | 'image' | 'email'>;
  size?: number;
};

export default function Avatar({ user, size }: Props) {
  if (!user) {
    return <></>;
  }
  return (
    <div className="tooltip" data-tip={user.name || user.email}>
      <Image
        src={user.image || '/avatar.jpg'}
        alt="avatar"
        width={size || 32}
        height={size || 32}
        className="rounded-full"
      />
    </div>
  );
}
