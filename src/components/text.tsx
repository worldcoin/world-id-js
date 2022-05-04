/**
 * This file contains styled text-based components (e.g. titles)
 */
import styled from 'styled-components'

export const H1 = styled.h1`
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: var(--text-default); // fallback
  font-size: 1.6em;
  text-align: left;
  line-height: 1.3em;
  margin: 0;
  font-weight: 500;
`

export const H2 = styled.div`
  font-weight: 500;
  font-size: 1.4em;
  line-height: 1.3em;
`

export const P = styled.p`
  margin: 1em 0;
`
