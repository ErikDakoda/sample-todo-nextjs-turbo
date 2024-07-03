import { getExtendedPrisma } from './prismaExtensions';
import type { UserRole } from '@erikdakoda/database/prisma/client';
import { enhance } from '@zenstackhq/runtime';
import { getBasePrisma } from './getBasePrisma';

const basePrisma = getBasePrisma();
const extendedPrisma = getExtendedPrisma(basePrisma);

const adminUser = {
  id: 'clkh2n9qn0005yla4smzvrf2y',
  email: 'erik@erikdakoda.com',
  role: 'ADMIN' as UserRole,
};

export const adminEnhancedPrisma = enhance(
  extendedPrisma,
  { user: adminUser },
  { logPrismaQuery: process.env.LOG_ZEN_QUERY === 'true' },
);
