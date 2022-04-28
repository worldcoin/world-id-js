<img src="https://raw.githubusercontent.com/worldcoin/world-id-js/main/world-id-logo.svg" alt="World ID logo" width="300" />

> 💡 World ID is currently in Alpha development and only works in a test network. Please share [feedback](#feedback) about your experience to help us launch soon!

# World ID Javascript Integration

The Javascript integration is the simplest way to integrate [World ID](https://worldcoin.org/world-id). The package currently supports web applications and requires only a few lines of code.

> World ID is a mechanism to verify a single human has performed a specific action only once without exposing any personal information.

World ID can be used for multiple use cases, including:

- **Democratic voting.** On-chain voting, ensure 1 person = 1 vote.
- **Airdrops.** A person receives an airdrop only once (prevent bot abuse).
- **Quadratic funding.** Fund projects based on the number of supporters.
- **Person-bound NFTs.** On-chain credentials, achievements, vaccination records, ... NFTs that always belong to the same person.
- **Account creation.** Verify a real person is creating an account once, even for non-web3 apps.
- **Fraud prevention.** More robust KYC and fraud prevention controls, even for non-web3 apps.

## 🎮 Demos

Want to see World ID in action? Check out some examples below,

- **Mesha Airdrop.** Verify a user is receiving this airdrop only once. Demo (coming soon) | Source (coming soon).
- **Cubed Voting.** Truly democratic voting on various topics. Demo (coming soon) | Source (coming soon).

## 🚀 Getting started

Getting started with the Javascript package is really easy. Just follow the steps below.

1. Install/include the package in your app (**recommended**) or add the code snippet from our CDN.

```bash
npm install @worldcoin/world-id
# or
yarn add @worldcoin/world-id
```

To add the script directly in your HTML,

```html
<script type="text/javascript" src="<tbd>" />
```

2. Add a `<div>` in your HTML where you'd like to include World ID.

```html
<div id="world-id-container"></div>
```

3. Initialize World ID (please refer to the docs for further customization details).

```js
worldID.init('world-id-container', {
  externalNullifier: '0x0000000000000000000000000000000000000000000000000000000000000000',
  proofSignal: '0x0000000000000000000000000000000000000000000000000000000000000000',
  appName: 'My App', // optional, but recommended
  signalDescription: 'Receive candies airdrop 2022', // optional, but recommended
  enableTelemetry: true, // optional, but recommended
})
```

4. On document load, enable the World ID flow. When you call `.enable()` you will receive a promise to which you can subscribe to receive success or failure results. On failure, we recommend you call `.enable()` again to let the user try again (unless the failure code is a terminal one, e.g. `already_signed`).

**With async/await:**

```js
document.addEventListener('DOMContentLoaded', async function () {
  try {
    const result = await worldID.enable()
    console.log('World ID verified succesfully:', result)
  } catch (failure) {
    console.warn('World ID verification failed:', failure)
    // Re-activate here so your end user can try again
  }
})
```

**With promises:**

```js
document.addEventListener('DOMContentLoaded', function () {
  worldID
    .enable()
    .then((result) => {
      console.log('World ID verified succesfully:', result)
    })
    .catch((failure) => {
      console.warn('World ID verification failed:', failure)
      // Re-activate here so your end user can try again
    })
})
```

## 📄 Documentation

Full documentation for this package can be found at [https://id.worldcoin.org/docs/js][docs].

## 🗣 Feedback

Please share all feedback on your experience. You can find us on [Discord](https://discord.gg/worldcoin), look for the [#world-id](https://discord.com/channels/956750052771127337/968523914638688306) channel. Additionally, feel free to open an issue or a PR directly on this repo.

## 🧑‍💻 Development & testing

To develop locally and contribute to this package, you can simply follow these instructions after clonning the repo.

- Install dependencies
  ```bash
  npm install
  ```
- Run tests
  ```bash
  npm run test
  ```
- Run local test project
  ```bash
  npm run dev
  ```
- Open browser at `http://localhost:3000`
- To build the production bundle you can simply run.
  ```bash
  npm run build
  ```

## 🧑‍⚖️ License

This repository is MIT licensed. Please review the LICENSE file in this repository.

Copyright (C) 2022 Tools for Humanity Corporation.

[docs]: https://id.worldcoin.org/docs/js
