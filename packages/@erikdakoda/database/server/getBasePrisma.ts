import { Client } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from 'db';

export function getBasePrisma() {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });
  const adapter = new PrismaPlanetScale(client);
  const basePrisma = new PrismaClient({
    adapter,
    log: process.env.LOG_PRISMA_INFO === 'true' ? ['error', 'warn', 'info'] : ['error', 'warn'],
  });

  return basePrisma;
}
