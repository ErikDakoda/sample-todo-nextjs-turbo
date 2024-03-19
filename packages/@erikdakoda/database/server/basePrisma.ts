import type { PrismaClient } from '../prisma/client';
import { getBasePrisma } from './getBasePrisma';

/**
 * The Prisma client without any extensions or ZenStack enhancements (like permissions).
 */
export const basePrisma: PrismaClient = getBasePrisma();
