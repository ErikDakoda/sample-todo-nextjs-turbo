import { type PrismaClient } from 'db';

declare global {
  const prisma: PrismaClient | undefined;

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_VERCEL_ENV: string;
      BASE_URL: string;
      SUPPORT_EMAIL: string;

      // NextAuth
      NEXTAUTH_SECRET: string;

      // Database
      DATABASE_HOST: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      DATABASE_URL: string;
      PRISMA_GENERATE_NO_ENGINE: string;
      LOG_PRISMA_QUERY: string;
      LOG_PRISMA_INFO: string;
    }
  }
}
