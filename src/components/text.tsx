/**
 * This file contains styled text-based components (e.g. titles)
 */
import styled from 'styled-components'
import { breakpoints } from 'const'

export const H1 = styled.h1`
  margin: 0;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: var(--text-default); // fallback
  font-family: 'Sora', sans-serif;
  font-size: 1.714em;
  font-weight: 600;
  line-height: 1.2em;
  text-align: left;

  @media (max-width: ${breakpoints.sm}) {
    font-size: 1.857em;
  }
`

export const H2 = styled.div`
  font-family: 'Sora', sans-serif;
  font-weight: 600;
  font-size: 1.429em;
  line-height: 1.2em;
`

export const H3 = styled.div`
  font-family: 'Sora', sans-serif;
  font-weight: 600;
  font-size: 1.286em;
  line-height: 1.333em;
`

export const P = styled.p`
  margin: 1em 0;
  font-family: 'Rubik', sans-serif;
  font-size: 1em;
  line-height: 1.286;
  letter-spacing: -0.01em;
  color: var(--text-default);
`

export const A = styled.a`
  color: var(--primary);
  &:visited {
    color: var(--primary);
  }
`
