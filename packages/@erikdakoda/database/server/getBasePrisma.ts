import { PrismaClient } from 'db';

export function getBasePrisma() {
  const basePrisma = new PrismaClient({
    log: process.env.LOG_PRISMA_INFO === 'true' ? ['error', 'warn', 'info'] : ['error', 'warn'],
  });

  return basePrisma;
}

export { Prisma } from 'db';
