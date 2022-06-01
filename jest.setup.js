import '@testing-library/jest-dom'
global.fetch = {
  bind: jest.fn(),
}
