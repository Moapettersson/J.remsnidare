import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const defaultMeta = {
  title: 'Sadelmakeriet - Traditionellt läderhantverk sedan generationer',
  description: 'Sadelmakeriet erbjuder traditionellt läderhantverk och sadelmakeri. Professionella tjänster för arkitekter och inredare samt kurser för privatpersoner.',
  image: '/og-image.jpg',
  url: 'https://sadelmakeriet.se',
  type: 'website'
};

export const SEO = ({ 
  title, 
  description = defaultMeta.description, 
  image = defaultMeta.image,
  url = defaultMeta.url,
  type = defaultMeta.type,
  jsonLd
}: SEOProps) => {
  const fullTitle = title 
    ? `${title} | Sadelmakeriet` 
    : defaultMeta.title;

  const jsonLdData = jsonLd || {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sadelmakeriet",
    "description": defaultMeta.description,
    "url": defaultMeta.url,
    "image": `${defaultMeta.url}${defaultMeta.image}`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SE"
    },
    "priceRange": "$$",
    "knowsAbout": ["Läderhantverk", "Sadelmakeri", "Läderkurser", "Lädermöbler"]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:site_name" content="Sadelmakeriet" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Swedish" />
      <meta name="author" content="Sadelmakeriet" />
      <link rel="canonical" href={url} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(Array.isArray(jsonLdData) ? jsonLdData : jsonLdData)}
      </script>
    </Helmet>
  );
};

export default SEO;
