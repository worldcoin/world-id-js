import { styled } from '@stitches/react'
import { ReactNode } from 'react'

const Link = styled('a', {
  backgroundColor: '$devButtonBg',
  color: '$color',
  borderRadius: '$lg',
  padding: '12px',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  justifyContent: 'start',
  alignContent: 'start',
  columnGap: '10px',
  rowGap: '2px',
  border: '1px solid',
  borderColor: '$devButtonBorder',
  cursor: 'pointer',
  textDecoration: 'none',
})

const Heading = styled('h3', {
  color: '$color',
  fontFamily: '"Rubik"',
  fontWeight: '500',
  fontSize: '12px',
  margin: '0',
  textAlign: 'left',
  userSelect: 'none',
  alignSelf: 'end',
})

const Description = styled('p', {
  color: '$grey5',
  margin: '0',
  fontFamily: '"Rubik"',
  fontSize: '10px',
  textAlign: 'left',
  userSelect: 'none',
  alignSelf: 'start',
})

const Icon = styled('div', {
  gridRow: 'span 2',
})

export const DevModeLink = (props: {
  href: string
  heading: string
  description: ReactNode
  icon: ReactNode
}): JSX.Element => {
  return (
    <Link href={props.href}>
      <Icon>{props.icon}</Icon>
      <Heading>{props.heading}</Heading>
      <Description>{props.description}</Description>
    </Link>
  )
}
