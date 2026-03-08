

## Plan: Komplettera SEO med sitemap, OG-bild-placeholder, JSON-LD och uppdaterad robots.txt

### 1. Skapa `public/sitemap.xml`
En statisk sitemap med alla sidor (/, /showroom, /shop, /kurser, /om-oss, /order, /offert-lindning) med `lastmod`, `changefreq` och `priority`.

### 2. Uppdatera `public/robots.txt`
Lägg till en `Sitemap:`-referens som pekar till `https://sadelmakeriet.se/sitemap.xml`.

### 3. Uppdatera `index.html`
- Ändra `lang="en"` till `lang="sv"`.
- Ta bort Lovable-specifika OG/Twitter-taggar (dessa hanteras nu av SEO-komponenten per sida).
- Ändra `meta name="author"` från "Lovable" till "Sadelmakeriet".

### 4. Utöka `SEO.tsx` med JSON-LD strukturerad data
Lägg till stöd för valfri `jsonLd`-prop som renderar ett `<script type="application/ld+json">` i `<Helmet>`. Inkludera default JSON-LD för LocalBusiness-schema (Sadelmakeriet).

### 5. Uppdatera varje sida med JSON-LD
Skicka sidspecifik JSON-LD till SEO-komponenten:
- **Landing**: `LocalBusiness` + `WebSite`-schema
- **Showroom**: `WebPage`-schema
- **Shop**: `WebPage` med `Product`-relaterad typ
- **Courses**: `Course`-schema
- **About**: `AboutPage`-schema
- **Order/OffertRequest**: `WebPage`

### Tekniska detaljer
- JSON-LD använder Schema.org-vokabulär
- Sitemap är statisk i `/public` (serveras automatiskt av Vite)
- Inga nya beroenden behövs

