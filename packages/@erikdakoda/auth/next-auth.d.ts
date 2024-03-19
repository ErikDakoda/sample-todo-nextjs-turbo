import type { UserRole, SpaceUser } from '@erikdakoda/database';

declare module 'next-auth' {
  interface User {
    id: string;
    createdAt: date;
    updatedAt: date;
    email: string;
    emailVerified: date | null;
    name: string | null;
    image: string | null;
    role: UserRole;
    activeSpaceId: string | null;
    spaces: Pick<SpaceUser, id | createdAt | updatedAt | spaceId | space | role>[] | [];
  }

  interface Session {
    user: User;
  }
}
