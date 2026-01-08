# Multi-Framework Microfrontend Demo

A demonstration of microfrontend architecture using multiple frameworks within a Next.js shell application.

## Architecture

- **Shell**: Next.js App Router (React native)
- **Microfrontends**: 
  - React (native Next.js components)
  - Angular (Web Component via `@angular/elements`)
  - Svelte (Compiled Component)
  - Vue (Web Component via `defineCustomElement`)

## Key Features

- **No iframe, no dummy data**: Each microfrontend runs as a real Web Component in the DOM
- **Shared Supabase backend**: All microfrontends fetch live data from the same Supabase database
- **Independent mounting**: Each framework's custom element is mounted independently from the Next.js shell

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
pnpm install
```

### Build Microfrontends

```bash
pnpm build:mf
```

This builds all microfrontend applications and copies their bundles to `apps/shell-next/public/mf/`.

### Run Development Server

```bash
pnpm --filter shell-next dev
```

## Usage

Visit the following URLs to see different framework implementations:

- `/en/about` - React (native Next.js)
- `/en/about?fw=angular` - Angular Web Component
- `/en/about?fw=svelte` - Svelte Compiled Component
- `/en/about?fw=vue` - Vue Web Component

## Project Structure

```
.
├── apps/
│   ├── shell-next/          # Next.js host application
│   ├── mf-angular-about/     # Angular microfrontend
│   ├── mf-svelte-about/      # Svelte microfrontend
│   └── mf-vue-about/         # Vue microfrontend
├── packages/
│   └── supabase-client/      # Shared Supabase client
└── scripts/
    └── copy-mf.js            # Build script for copying MF bundles
```

## Environment Variables

Create `apps/shell-next/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These values are automatically passed to microfrontends via global window variables.

