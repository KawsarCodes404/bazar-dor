# বাজার দর · BazarDor

বাজার দর is a responsive Bengali market-price dashboard for checking everyday product prices, comparing market ranges, and seeing which prices are moving up or down.

## Features

- Responsive home page with a market-price hero, category navigation, and scrolling price ticker.
- Product sections for the six biggest price increases and decreases, plus the full product list.
- Product cards with Bengali prices, units, and change badges.
- Protected product detail pages with minimum, maximum, average, and market-by-market prices.
- Category pages with Bengali-number-aware ascending and descending price sorting.
- BetterAuth email/password, Google, and GitHub sign-in and registration.
- Profile menu, sign-out, social account linking, and a separate profile information update page.
- Bengali loading states, toast feedback, and friendly not-found pages.

## Technology

- Next.js App Router and React
- TypeScript
- Tailwind CSS 4 and DaisyUI
- BetterAuth with MongoDB
- React Hot Toast

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For authentication, configure the BetterAuth and MongoDB environment variables used in `src/lib/auth.ts` and `src/lib/auth-client.ts` (MongoDB URL, BetterAuth URL/secret, and Google/GitHub OAuth credentials). Keep credentials in a local `.env` file and never commit them.

The app fetches market data from the Programming Hero BazarDor API at `https://openapi.programming-hero.com/api/bazardor`. To provide an optional fallback API root, set `BAZARDOR_API_URL` to a compatible base URL ending in `/api/bazardor`.

## Useful commands

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Build for deployment
npm run start    # Serve the production build
```

## Project links

- Assignment and design requirements: [B14-A7-Bazar-Dor](https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor)
- Live demo: _Add deployment URL before submission._
- Repository: _Add repository URL before submission._
