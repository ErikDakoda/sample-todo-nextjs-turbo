import { useCurrentSpace, useCurrentUser } from '@erikdakoda/auth-ui/context';
import NavBar from './NavBar';

type Props = {
  children: JSX.Element | JSX.Element[] | undefined;
};

export default function WithNavBar({ children }: Props) {
  const { user } = useCurrentUser();
  const space = useCurrentSpace();

  return (
    <>
      <NavBar user={user} space={space} />
      {children}
    </>
  );
}
