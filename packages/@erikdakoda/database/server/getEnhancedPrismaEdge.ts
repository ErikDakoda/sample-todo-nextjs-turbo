import { authOptions } from '@erikdakoda/auth/server/next-auth';
import { enhance, type AuthUser } from '@zenstackhq/runtime';
import { getServerSession } from 'next-auth/next';
import { getBasePrisma, getPrismaModule } from './getBasePrisma';
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
    { logPrismaQuery: process.env.LOG_ZEN_QUERY === 'true', prismaModule: getPrismaModule() },
  );
}
