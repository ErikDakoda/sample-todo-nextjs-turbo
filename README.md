<div align="center">
    <img src="https://github.com/zenstackhq/sample-todo-sveltekit/assets/16688722/df13f0ee-1d56-4a13-9a55-39e8779c6d9f" height="256">
    <h1>ZenStack Monorepo Demo</h1>
    <a href="https://twitter.com/intent/tweet?text=Wow%20%40zenstackhq">
        <img src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fzenstackhq%2Fzenstack">
    </a>
    <a href="https://discord.gg/6HhebQynfz">
        <img src="https://img.shields.io/discord/1035538056146595961">
    </a>
</div>

# A Collaborative Todo Sample - ZenStack + Next.js using PNPM + Turborepo

This project is a collaborative Todo app built with [Next.js](https://nextjs.org), [Next-Auth](nextauth.org), [ZenStack](https://zenstack.dev), [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react), [PlanetScale serverless driver](https://www.npmjs.com/package/@planetscale/database) with [Prisma driver adapter](https://www.npmjs.com/package/@prisma/adapter-planetscale), [Zod](https://zod.dev/), and [Tailwind CSS](https://tailwindcss.com). All apps and packages are configured as ES Modules.

In this fictitious app, users can be invited to workspaces where they can collaborate on todos. Public todo lists are visible to all members in the workspace.

> See a live deployment at: https://zenstack-todo.vercel.app/.
>
> For more information on using ZenStack, visit [https://zenstack.dev](https://zenstack.dev).

## Features

- User signup/signin
- Creating workspaces and inviting members
- Data segregation and permission control

## Apps and Packages

- `apps`
  - `todo`: a Next.js app
- `packages`
  - `@erikdakoda`
    - `auth`: Models for User, Account, Space, and SpaceUser; Base model with created dates, owner, and space; NextAuth configuration
    - `auth-ui`: React user context and auth components
    - `database`: Prisma client and schema
    - `tailwind-ui`: Tailwind CSS components
    - `todo`: Models for Todo, and List
  - `default-configs`: Shared default configs for eslint, tailwind, tsconfig, and vitest

Each package/app is 100% TypeScript.

## Implementation

- Prisma and ZenStack are implemented in `@erikdakoda/database` package.
  - Data model is located at `schema.zmodel` and in various packages.
  - Prisma client is generated in `prisma` folder.
  - [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react) React CRUD hooks are generated in `hooks` folder.
  - [Zod](https://zod.dev/) schema is generated in `zod` folder.
- An automatic CRUD API is mounted at `/api/model` by `apps/todo/pages/api/model/[...path].ts`.

## Running the sample

1. Setup a database

   For simplicity `apps/todo/.env.local` is already configured with environment variables to use a PlanetScale database branch. The data in this database may be reset at any time.

2. Install dependencies

   ```bash
   pnpm run pnpm:install
   ```

3. Generate server and client-side code from model

   ```bash
   pnpm run zen:generate
   ```

4. Create Prisma symlinks

   ```bash
   pnpm run prisma:symlinks
   ```

5. Synchronize database schema

   ```bash
   pnpm run prisma:push
   ```

6. Start dev server

   ```bash
   pnpm run dev
   ```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```bash
cd sample-todo-monorepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```bash
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
