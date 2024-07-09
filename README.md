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

This project is a collaborative Todo app built with [Next.js](https://nextjs.org), [Next-Auth](nextauth.org), [ZenStack](https://zenstack.dev), [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react), [Zod](https://zod.dev/), and [Tailwind CSS](https://tailwindcss.com). It's purpose is to test and demonstrate the usage of Prisma and ZenStack in a monorepo setup. All apps and packages are 100% TypeScript and configured as ES Modules.

In this fictitious app, users can be invited to workspaces where they can collaborate on todos. Public todo lists are visible to all members in the workspace. Password authentication is implemented using ZenStack and NextAuth.

> [!TIP]
> See a live deployment at: <https://sample-todo-nextjs-turbo.vercel.app>.
>
> For more information on using ZenStack, visit [https://zenstack.dev](https://zenstack.dev).

## Apps and Packages

- `apps`

  - `todo`: a Next.js app

- `packages`

  - `@erikdakoda`

    - `auth`: NextAuth configuration; Models for User, Account, Space, and SpaceUser; OwnedItem polymorphic base model declaring created dates, owner, and space

    - `auth-ui`: React user context and auth components

    - `database`: Prisma Client and schema; ZenStack generates Tanstack Query hooks, Prisma client, and Zod schemas here

    - `todo`: Models for Todo, and List

    - `todo-ui`: React components for Todo and List

  - `default-configs`: Shared default configs for eslint and tsconfig

## Implementation

- The `@erikdakoda/database` package implements Prisma and ZenStack.

  - The data client is configured in `schema.zmodel` in this package, while the models for individual entities reside in their various packages.

  - The Prisma Client is generated in the `prisma` folder and then exported from the package.

  - [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react) React [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) hooks are generated in the `hooks` folder.

  - [Zod](https://zod.dev/) schemas are generated in the `zod` folder and are used by ZenStack to validate CRUD operations. You can also use them in conjunction with [React Hook Form](https://react-hook-form.com/) to validate forms.

- An automatic RESTful API is mounted at `/api/model` in `apps/todo/pages/api/model/[...path].ts`.

- On the server side always import the Prisma Client from the database package.

  - In API routes and `getServerSideProps()` use `getEnhancedPrisma()` to get a Prisma Client with extensions and ZenStack enhancements enabled. Permissions with the credentials of the currently signed-in user will be enforced. See `apps/todo/src/pages/index.tsx` for an example.

  - In server code where the context is not available and/or you need to execute administrative tasks, use `import { adminEnhancedPrisma } from '@erikdakoda/database/server/adminEnhancedPrisma'` to get a Prisma Client with extensions and ZenStack enhancements enabled. This Prisma Client impersonates an administrator.

  - There is a mechanism for packages to register [Prisma Client extensions](https://www.prisma.io/docs/orm/prisma-client/client-extensions) but it is not yet documented. In the meantime see `@erikdakoda/database/server/prismaExtensions.ts` for a minimal example.

## Running the sample

1. Setup a database

   Rename `apps/todo/.env.local.example` to `.env.local`. For testing purposes, you can use the sample database provided. This database may be reset periodically.

2. Install dependencies

   ```bash
   pnpm run pnpm:install
   ```

3. Generate server and client-side code from the model

   ```bash
   pnpm run zen:generate
   ```

4. Synchronize database schema

   ```bash
   pnpm run prisma:push
   ```

5. Start dev server

   ```bash
   pnpm run dev
   ```

6. Visit the app at [http://localhost:3000](http://localhost:3000)

## Gotchas

While converting my Prisma/ZenStack project to a monorepo, I learned the following:

- I had to add `public-hoist-pattern[]='*'` to `.npmrc`. I tried just adding `*prisma*` and `*zenstack*` but I kept getting broken builds. This can probably be fine tuned with more patience.

- I had to add `@prisma/nextjs-monorepo-workaround-plugin` to `next.config.js`

- I had to use the `serverComponentsExternalPackages` experimental option for `@zenstackhq/runtime` in `next.config.js`

- I had to add my packages to `transpilePackages` in `next.config.json` or stange things started happening.

## Using Turborepo

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

### Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
