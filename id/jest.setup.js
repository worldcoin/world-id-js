import '@testing-library/jest-dom'
import React from 'react'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// NOTE: Add global react to avoid "ReferenceError: React is not defined" error
global.React = React
global.fetch = {
  bind: jest.fn(),
}
