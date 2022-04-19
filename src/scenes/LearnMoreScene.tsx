export function LearnMoreScene(): JSX.Element {
  return (
    <div>
      <p>
        World ID, in a unique and privacy preserving way, verifies if someone performing an action is a human doing
        something only once.
      </p>
      <p>
        World ID enables proving human uniqueness without intruding on privacy, you don't have to tell us or anyone else
        anything about yourself. Not even your wallet address, hash, or anything else is associated with your
        verification request.
      </p>
      <p>
        Worldcoin, a new, collectively owned global currency, built a new device called the Orb. The Orb solves this
        verification problem through biometrics: it captures an image of a person's eyes, which is converted into an
        irreversible numeric code, and using cryptographic proofs we can verify if someone has already signed up,
        without even storing the numeric code.
      </p>
    </div>
  )
}
