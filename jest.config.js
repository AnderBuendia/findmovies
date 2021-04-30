module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    '@Components/(.*)': '<rootDir>/src/components/$1',
    '@Enums/(.*)': '<rootDir>/src/enums/$1',
    '@Interfaces/(.*)': '<rootDir>/src/interfaces/$1',
    '@Lib/(.*)': '<rootDir>/src/lib/$1',
    '@Pages/(.*)': '<rootDir>/src/pages/$1',
  },
};
