# Izakaya Zen

Restoran sitesi. React + TypeScript + Vite + Tailwind CSS + shadcn/ui yapısında, 5 ayrı sayfa (multi-page app, client-side routing yok):

- `index.html` — Ana sayfa (hero: `src/components/ui/broken-by-design.tsx`)
- `menu.html` — Menü
- `hakkimizda.html` — Hakkımızda
- `rezervasyon.html` — Rezervasyon
- `iletisim.html` — İletişim

## Geliştirme

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # dist/ üretir
npm run preview # üretilen build'i lokal önizler
```

`main` branch'ine her push'ta `.github/workflows/deploy.yml` otomatik build alıp GitHub Pages'e yayınlar (repo Settings → Pages → Source "GitHub Actions" olmalı).

## Motion layer

Scroll animasyonları (`src/lib/animations.ts`) Lenis + GSAP/ScrollTrigger ile yazıldı, tüm ayarlar dosyanın başındaki `CONFIG` objesinden yönetilir. `prefers-reduced-motion` açıkken hiçbir animasyon kurulmaz.
