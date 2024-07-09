import { authOptions } from '@erikdakoda/auth/server/next-auth';
import { enhance } from '@zenstackhq/runtime';
import { getServerSession } from 'next-auth/next';
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
    { user: session?.user },
    { logPrismaQuery: process.env.LOG_ZEN_QUERY === 'true' },
  );
}
