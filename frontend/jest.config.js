const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['jest-canvas-mock'],
  moduleNameMapper: {
    '^@react-pdf/renderer$': '<rootDir>/__mocks__/@react-pdf/renderer.js',
    '^@react-pdf/primitives$': '<rootDir>/__mocks__/@react-pdf/primitives.js',
  },
}

module.exports = createJestConfig(customJestConfig)
