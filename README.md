<img src="https://raw.githubusercontent.com/worldcoin/world-id-js/main/world-id-logo.svg" alt="World ID logo" width="300" />

# World ID Javascript Integration

The Javascript integration is the simplest way to integrate [World ID](https://id.worldcoin.org). The package currently supports web applications and requires only a few lines of code.

<!-- WORLD-ID-SHARED-README-TAG:START - Do not remove or modify this section directly -->
<!-- WORLD-ID-SHARED-README-TAG:END -->

## 🚀 Getting started

Getting started with the Javascript package is really easy. Just follow the steps below.

1. Install/include the package in your app (**recommended**) or add the code snippet from our CDN.

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
  actionId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  signal: '0x0000000000000000000000000000000000000000000000000000000000000000',
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
