# Multi-Framework Microfrontend Demo

Next.js shell içinde Angular, Svelte ve Vue microfrontend'lerini Web Component olarak çalıştıran bir demo proje.

## Ne Yapıyor?

- Next.js App Router shell uygulaması (React native)
- Angular, Svelte, Vue microfrontend'ler Web Component olarak mount ediliyor
- Her biri Supabase'den gerçek veri çekiyor (iframe yok, dummy data yok)
- Framework değiştirmek için `?fw=angular|svelte|vue` query param kullanılıyor

## Kurulum

```bash
pnpm install
pnpm build:mf
pnpm --filter shell-next dev
```

## Kullanım

- `/en/about` - React (native)
- `/en/about?fw=angular` - Angular Web Component
- `/en/about?fw=svelte` - Svelte Compiled Component
- `/en/about?fw=vue` - Vue Web Component

## Yapı

```
apps/
  shell-next/          # Next.js host
  mf-angular-about/    # Angular MF
  mf-svelte-about/     # Svelte MF
  mf-vue-about/        # Vue MF
packages/
  supabase-client/     # Shared Supabase client
scripts/
  copy-mf.js           # Build script
```

## Env

`apps/shell-next/.env.local` :

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```