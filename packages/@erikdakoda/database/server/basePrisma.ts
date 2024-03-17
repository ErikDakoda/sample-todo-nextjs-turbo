import type { PrismaClient } from 'db';
import { getBasePrisma } from './getBasePrisma';

/**
 * The Prisma client without any extensions and permissions.
 * Use basePrisma inside prisma extensions to avoid infinite loops.
 */
export const basePrisma: PrismaClient = getBasePrisma();
