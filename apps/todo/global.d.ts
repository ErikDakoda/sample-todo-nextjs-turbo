import { type PrismaClient } from '@prisma/client';

declare global {
  const prisma: PrismaClient | undefined;

  namespace NodeJS {
    interface ProcessEnv {
      // NextAuth
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;

      // Database
      DATABASE_URL: string;
      LOG_ZEN_QUERY: string;
      LOG_PRISMA_INFO: string;
    }
  }
}
