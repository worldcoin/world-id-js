import { styled } from '@stitches/react'
import { Typography } from 'components/Typography'

const LearnMore = styled('div', {
  display: 'grid',
  alignItems: 'center',
  rowGap: '24px',
  color: '$color',
  padding: '12px 12px 0',
})
const Text = styled(Typography)

const Link = styled('a', {
  color: '$primary',
})
export const LearnMoreScene = (): JSX.Element => {
  return (
    <LearnMore>
      <Text variant="p1">
        World ID, in a completely privacy-preserving way, verifies a human is performing an action only once.
      </Text>
      <Text variant="p1">
        World ID enables proving human uniqueness without intruding on privacy, you don't have to tell us or anyone else
        anything about yourself.
      </Text>
      <Text variant="p1">
        World ID uses a device called the Orb. The Orb solves the verification problem through biometrics. Learn more
        about World ID, Worldcoin and the Orb{' '}
        <Link href="https://worldcoin.org/blog" target="_blank" rel="noopener">
          here
        </Link>
        .
      </Text>
    </LearnMore>
  )
}
