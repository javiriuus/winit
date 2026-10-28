/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Spanish at /, English at /en (indexable by search engines). The first visit to /
  // follows the browser language; the ES/EN switch remembers the choice (NEXT_LOCALE cookie).
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
  },
};
