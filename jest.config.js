import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { version } = require('./package.json')

export default {
  roots: ['<rootDir>/src'],
  coverageReporters: ['json-summary', 'html'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^react$': 'preact/compat',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '.(js|jsx|ts|tsx)$': [
      'esbuild-jest',
      {
        sourcemap: true,
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
      },
    ],
  },
  globals: {
    worldIdJSVersion: version,
  },
}
