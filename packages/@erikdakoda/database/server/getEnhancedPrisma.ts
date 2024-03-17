import { type AuthUser, enhance } from '@zenstackhq/runtime';
import type { GetServerSidePropsContext } from 'next';
import { getServerAuthSession } from '@dakoda/auth/server/getServerAuthSession';
import { getBasePrisma } from './getBasePrisma';
import { getExtendedPrisma } from './prismaExtensions';

const basePrisma = getBasePrisma();

export async function getEnhancedPrisma(ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) {
  const session = await getServerAuthSession(ctx);
  const extendedPrisma = getExtendedPrisma(basePrisma);
  return enhance(
    extendedPrisma,
    { user: session?.user as unknown as AuthUser },
    { logPrismaQuery: process.env.LOG_PRISMA_QUERY === 'true' },
  );
}
