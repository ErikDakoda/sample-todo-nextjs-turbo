import { getBasePrisma } from './getBasePrisma';
import { getExtendedPrisma } from './prismaExtensions';

const basePrisma = getBasePrisma();

/**
 * The Prisma client with extensions but without ZenStack enhancements (like permissions).
 * See https://www.prisma.io/docs/orm/prisma-client/client-extensions
 */
export const extendedPrisma = getExtendedPrisma(basePrisma);
