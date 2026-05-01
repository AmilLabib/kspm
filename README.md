This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare Workers

The project ships with a Wrangler configuration and helper scripts so it can run on Cloudflare's Workers runtime via `@cloudflare/next-on-pages`:

1. Authenticate once with Cloudflare: `npx wrangler login`.
2. Build the Worker bundle and static assets: `npm run cf:build` (wraps `@cloudflare/next-on-pages`).
3. Preview locally: `npm run cf:dev`, which runs `wrangler pages dev .vercel/output/static --compatibility-flag=nodejs_compat` against the generated output for a workerd-accurate test loop.[¹](https://github.com/cloudflare/next-on-pages/tree/main/packages/next-on-pages#recommended-development-workflow)
4. Deploy to Workers: `npm run cf:deploy` (rebuilds and runs `wrangler deploy` using the settings in `wrangler.toml`).

The `wrangler.toml` produced for this repo already sets `compatibility_date`, enables `nodejs_compat`, and points at the generated `_worker.js` plus static asset bucket under `.vercel/output/static`. Adjust bindings (KV, R2, secrets, etc.) in that file as you adopt Cloudflare services.

## Deploy on Vercel

The easiest way to deploy your Next.js app is still the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
