import { Client } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from 'db';

export function getBasePrisma() {
  const client = new Client({
    url: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPlanetScale(client);
  const basePrisma = new PrismaClient({
    adapter,
    log: process.env.LOG_PRISMA_INFO === 'true' ? ['error', 'warn', 'info'] : ['error', 'warn'],
  });

  return basePrisma;
}

export { Prisma } from 'db';
