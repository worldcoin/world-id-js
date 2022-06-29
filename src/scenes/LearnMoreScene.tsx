import { A, P } from 'components/text'

export function LearnMoreScene(): JSX.Element {
  return (
    <div>
      <P>World ID, in a completely privacy-preserving way, verifies a human is performing an action only once.</P>
      <P>
        World ID enables proving human uniqueness without intruding on privacy, you don't have to tell us or anyone else
        anything about yourself.
      </P>
      <P>
        World ID uses a device called the Orb. The Orb solves the verification problem through biometrics. Learn more
        about World ID, Worldcoin and the Orb{' '}
        <A href="https://worldcoin.org/blog" target="_blank" rel="noopener">
          here
        </A>
        .
      </P>
    </div>
  )
}
