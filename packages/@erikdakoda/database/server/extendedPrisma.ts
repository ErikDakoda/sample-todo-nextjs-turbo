import { getBasePrisma } from './getBasePrisma';
import { getExtendedPrisma } from './prismaExtensions';

const basePrisma = getBasePrisma();
export const extendedPrisma = getExtendedPrisma(basePrisma);
