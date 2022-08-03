import '@testing-library/jest-dom'
import React from 'react'

// NOTE: Add global react to avoid "ReferenceError: React is not defined" error
global.React = React
global.fetch = {
  bind: jest.fn(),
}
