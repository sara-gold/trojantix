# TrojanTix

A simple place for USC students to buy, sell, and swap football tickets with each other.

Today this happens in group chats and Instagram stories, where listings get buried and scams are common. TrojanTix gives every USC home game one clear list of "have" and "want" listings, open only to `@usc.edu` accounts.

> Hackathon demo project. TrojanTix never handles money or the ticket transfer itself; that happens in the official ticketing app.

## Features

- [x] Seeded list of 2026 USC home games
- [ ] Sign-in restricted to `@usc.edu` emails
- [ ] Browse listings by game, filtered by have/want, section type, and price
- [ ] Create a listing with a form
- [ ] AI quick post: paste a group-chat message and get a pre-filled listing form to review
- [ ] Contact the seller or buyer
- [ ] Mark a listing as traded

## Tech stack

Next.js (App Router) + TypeScript, Tailwind CSS, Supabase (Postgres + auth), Claude API (server-side only), hosted on Vercel.

## Run it locally

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local   # fill in keys once a feature needs them
npm run dev
```

Then open http://localhost:3000.
