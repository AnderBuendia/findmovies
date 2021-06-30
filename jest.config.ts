export default {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@Components/(.*)': '<rootDir>/src/components/$1',
    '@Enums/(.*)': '<rootDir>/src/enums/$1',
    '@Interfaces/(.*)': '<rootDir>/src/interfaces/$1',
    '@Lib/(.*)': '<rootDir>/src/lib/$1',
    '@Pages/(.*)': '<rootDir>/src/pages/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '/^.+.(css|less|scss|sass)$/': 'identity-obj-proxy',
  },
};
