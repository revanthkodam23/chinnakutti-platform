# Chinnakutti Frontend

Production-ready Next.js 15 App Router application for the Chinnakutti.Fun children's storytelling platform.

## Stack

- Next.js 15 with App Router and TypeScript
- Tailwind CSS with class-based dark mode
- SEO metadata, Open Graph, robots, and sitemap support
- Playful story listing, story detail, category, and parent pages
- API integration layer that can read from a backend or local fixtures
- AWS-ready deployment via Amplify or standalone Docker output

## Local Development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set `CONTENT_API_BASE_URL` when a backend is available.

## Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run start` serves the production build
- `npm run typecheck` runs TypeScript validation

## AWS Deployment

- **AWS Amplify Hosting:** use `amplify.yml` from this folder.
- **ECS/App Runner/Elastic Beanstalk:** build the included `Dockerfile`. The app uses `output: "standalone"` for a small production image.
