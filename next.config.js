/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Spanish at /, English at /en (indexable by search engines). The first visit to /
  // follows the browser language; the ES/EN switch remembers the choice (NEXT_LOCALE cookie).
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
  },
  // Addresses that changed once a work got its own title (old links keep working).
  async redirects() {
    return [
      { source: "/trabajo/cortometraje", destination: "/trabajo/cuando-a-la-manana-siguiente-ella-sigue-ahi", permanent: true },
      { source: "/trabajo/etalonaje", destination: "/trabajo/los-reyes-del-mundo", permanent: true },
      { source: "/trabajo/s-e-p-shortfilm-teaser", destination: "/trabajo/sep", permanent: true },
    ];
  },
};
