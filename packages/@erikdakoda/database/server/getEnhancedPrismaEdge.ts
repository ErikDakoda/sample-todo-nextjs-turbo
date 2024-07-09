import { authOptions } from '@erikdakoda/auth/server/next-auth';
import { enhance } from '@zenstackhq/runtime';
import { getServerSession } from 'next-auth/next';
import { getBasePrisma } from './getBasePrisma';
import { getExtendedPrisma } from './prismaExtensions';

const basePrisma = getBasePrisma();

export async function getEnhancedPrismaEdge(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const extendedPrisma = getExtendedPrisma(basePrisma);
  // @ts-ignore
  return enhance(
    extendedPrisma,
    { user: session?.user },
    { logPrismaQuery: process.env.LOG_ZEN_QUERY === 'true' },
  );
}
