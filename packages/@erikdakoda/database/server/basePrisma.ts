import type { PrismaClient } from 'db';
import { getBasePrisma } from './getBasePrisma';

/**
 * The Prisma client without any extensions or ZenStack enhancements (like permissions).
 */
export const basePrisma: PrismaClient = getBasePrisma();
