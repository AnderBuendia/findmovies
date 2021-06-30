module.exports = {
  webpack5: true,
  publicRuntimeConfig: {
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ['image.tmdb.org', 'www.themoviedb.org'],
  },
};
