const fetchIndex = require('./fetchIndexPage');

/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    const redirects = [];
    const page = await fetchIndex();

    if (page) {
      redirects.push({
        source: '/',
        destination: `/${page}`,
        permanent: true,
      })
    }

    return redirects;
  },
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
}
