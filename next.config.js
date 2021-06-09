module.exports = {
  env: {
    SITE_URL: process.env.SITE_URL,
  },
  publicRuntimeConfig: {
    API_MOVIES_URL: process.env.API_MOVIES_URL,
    POSTER_URL: process.env.POSTER_URL,
    SITE_URL: process.env.SITE_URL,
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ['image.tmdb.org'],
  },
  future: {
    webpack5: true,
  },
};
