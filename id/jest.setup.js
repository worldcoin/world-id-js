import '@testing-library/jest-dom'
import { h, Fragment } from 'preact'
global.h = h
global.Fragment = Fragment
global.fetch = {
  bind: jest.fn(),
}
