import site from '../content/site.json';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hhmm = (min: number) => {
  const m = min % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

export function barSchema(lang: 'de' | 'en', url: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: site.name,
    url,
    description,
    inLanguage: lang === 'de' ? 'de-DE' : 'en-GB',
    telephone: site.phone,
    email: site.email,
    image: site.url + '/og-bar.jpg',
    servesCuisine: 'Irish',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      postalCode: site.zip,
      addressLocality: site.city,
      addressCountry: site.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${dayNames[h.day]}`,
      opens: hhmm(h.open),
      closes: hhmm(h.close),
    })),
    sameAs: [site.social.facebook, site.social.instagram],
    award: site.awards.map((a) => `Irish Hospitality Global Awards ${a.year}: ${a.title} ${a.region}`),
  };
}
