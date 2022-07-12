import React from 'react'
import ReactDOM from 'react-dom/client'
import { Widget } from './Widget'

import { styled } from '@stitches/react'

const Container = styled('div', {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Container>
      <Widget />
    </Container>
  </React.StrictMode>
)
