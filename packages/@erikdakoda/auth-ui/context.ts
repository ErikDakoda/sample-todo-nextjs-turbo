import type { Space, User } from '@erikdakoda/database';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createContext } from 'react';
import { useFindManySpace } from '@erikdakoda/database/hooks';

export type UserContextType = {
  user: User | undefined;
  isUserLoading: boolean;
  isAuthenticated: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  isUserLoading: true,
  isAuthenticated: false,
});

export function useCurrentUser(): UserContextType {
  const { data, status } = useSession();

  return {
    user: data?.user as User | undefined,
    isUserLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
}

export const SpaceContext = createContext<Space | undefined>(undefined);

export function useCurrentSpace() {
  const router = useRouter();
  const { data: spaces } = useFindManySpace(
    {
      where: {
        slug: router.query.slug as string,
      },
    },
    /* {
            disabled: !router.query.slug,
        } */
  );

  return spaces?.[0];
}
