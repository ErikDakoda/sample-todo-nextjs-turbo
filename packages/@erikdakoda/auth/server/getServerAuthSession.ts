import { type GetServerSidePropsContext } from 'next';
// @ts-ignore
import { getServerSession } from 'next-auth/next';
import { authOptions } from './next-auth';

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
