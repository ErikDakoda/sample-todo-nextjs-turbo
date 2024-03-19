import { type PrismaClient, Prisma } from '@prisma/client';

export type Extension = ReturnType<typeof Prisma.defineExtension>;

export const prismaExtensions: Extension[] = [];

export function registerPrismaExtension(extension: Extension) {
  prismaExtensions.push(extension);
}

export function getExtendedPrisma(prisma: PrismaClient) {
  for (const extension of prismaExtensions) {
    prisma = prisma.$extends(extension) as unknown as PrismaClient;
  }
  return prisma;
}

//***** Example *****//
const extension = Prisma.defineExtension({
  name: 'log-extension',
  client: {
    $log: (s: string) => console.log(s),
  },
});

registerPrismaExtension(extension);
//********* *********//
