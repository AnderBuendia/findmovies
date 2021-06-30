import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    API_KEY: process.env.API_KEY,
  },
}));
