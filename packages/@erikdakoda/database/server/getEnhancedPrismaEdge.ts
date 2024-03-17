import { type AuthUser, enhance } from '@zenstackhq/runtime';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@dakoda/auth/server/next-auth';
import { getBasePrisma } from './getBasePrisma';
import { getExtendedPrisma } from './prismaExtensions';

const basePrisma = getBasePrisma();

// @ts-ignore
export async function getEnhancedPrismaEdge(req, res) {
  const session = await getServerSession(req, res, authOptions);
  // @ts-ignore
  const extendedPrisma = getExtendedPrisma(basePrisma);
  return enhance(
    extendedPrisma,
    { user: session?.user as unknown as AuthUser },
    { logPrismaQuery: process.env.LOG_PRISMA_QUERY === 'true' },
  );
}
