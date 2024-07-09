import type { UserRole, SpaceUser } from '@erikdakoda/database';

declare module 'next-auth' {
  interface User {
    id: string;
    createdAt: date;
    updatedAt?: date;
    email: string;
    emailVerified?: date;
    name?: string;
    image?: string;
    role: UserRole;
    activeSpaceId?: string;
    spaces: Pick<SpaceUser, id | createdAt | updatedAt | spaceId | space | role>[] | [];
  }

  interface Session {
    user: {
      id: string;
      createdAt: date;
      updatedAt?: date;
      email: string;
      emailVerified?: date;
      name?: string;
      image?: string;
      role: UserRole;
      activeSpaceId?: string;
      spaces: Pick<SpaceUser, id | createdAt | updatedAt | spaceId | space | role>[] | [];
    };
  }
}
