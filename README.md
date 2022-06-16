<img src="https://raw.githubusercontent.com/worldcoin/world-id-js/main/world-id-logo.svg" alt="World ID logo" width="300" />

# World ID Javascript Integration

The Javascript integration is the most flexible way to integrate [World ID](https://id.worldcoin.org) on the frontend. The package currently supports web applications and requires only a few lines of code.

## 🚀 Getting started

Getting started with the Javascript package is really easy. Just follow the steps below.

1. Install/include the package in your app (**recommended**) or add the code snippet from the UNPKG CDN.

```bash
npm install @worldcoin/id
# or
yarn add @worldcoin/id
```

To add the script directly in your HTML,

```html
<script type="text/javascript" src="//unpkg.com/@worldcoin/id/dist/world-id.js"></script>
```

2. Add a `<div>` in your HTML where you'd like to include World ID.

```html
<div id="world-id-container"></div>
```

3. Initialize World ID (please refer to the docs for further customization details).

```js
worldID.init('world-id-container', {
  action_id: 'wid_staging_PN8fFL7V2N', // obtain this from developer.worldcoin.org
  signal: 'my_signal',
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

<!-- WORLD-ID-SHARED-README-TAG:START - Do not remove or modify this section directly -->
<!-- The contents of this file are inserted to all World ID repositories to provide general context on World ID. -->

## <img align="left" width="28" height="28" src="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/static/img/readme-orb.png" alt="" style="margin-right: 0;" /> About World ID

World ID is a protocol that lets you **prove a human is doing an action only once without revealing any personal data**. Stop bots, stop abuse.

World ID uses a device called the [Orb](https://worldcoin.org/how-the-launch-works) which takes a picture of a person's iris to verify they are a unique and alive human. The protocol uses [Zero-knowledge proofs](https://id.worldcoin.org/zkp) so no traceable information is ever public.

World ID is meant for on-chain web3 apps, traditional cloud applications, and even IRL verifications.

<img src="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/static/img/readme-diagram.png" alt="Diagram of how World ID works."  />

### Getting started with World ID

Regardless of how you landed here, the easiest way to get started with World ID is through the the [Dev Portal](https://developer.worldcoin.org).

<a href="https://developer.worldcoin.org">
<p align="center">
  <img src="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/static/img/readme-get-started.png" alt="Get started" height="50" />
</p>
</a>

### World ID Demos

Want to see World ID in action? We have a bunch of [Examples](https://id.worldcoin.org/examples).

<a href="https://id.worldcoin.org/examples">
<p align="center">
  <img src="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/static/img/readme-examples.png" alt="Click here to see examples" height="150" />
</p>
</a>

## 📄 Documentation

We have comprehensive docs for World ID at https://id.worldcoin.org/docs.

<a href="https://id.worldcoin.org/docs">
<p align="center">
  <img src="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/static/img/readme-docs.png" alt="Visit documentation" height="50" />
</p>
</a>

## 🗣 Feedback

**World ID is in Beta, help us improve!** Please share feedback on your experience. You can find us on [Discord](https://discord.gg/worldcoin), look for the [#world-id](https://discord.com/channels/956750052771127337/968523914638688306) channel. You can also open an issue or a PR directly on this repo.

<a href="https://discord.gg/worldcoin">
<p align="center">
  <img src="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/static/img/readme-discord.png" alt="Join Discord" height="50" />
</p>
</a>

<!-- WORLD-ID-SHARED-README-TAG:END -->

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

[docs]: https://id.worldcoin.org/docs/js
