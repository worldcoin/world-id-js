<img src="https://raw.githubusercontent.com/worldcoin/world-id-js/main/world-id-logo.svg" alt="World ID logo" width="300" />

# World ID JS Widget

The Javascript integration is the most flexible way to integrate [World ID](https://id.worldcoin.org) on the frontend. The package currently supports web applications and requires only a few lines of code.

## 🚀 Getting started

Getting started with the Javascript package is really easy. Just follow the steps below.

### Installation

- Install the package in your app (**recommended**).

```bash
yarn add @worldcoin/id
# or
npm install @worldcoin/id
```

- **Alternatively**, you can add the standalone script directly in your HTML,

```html
<script type="text/javascript" src="//unpkg.com/@worldcoin/id/dist/world-id.js"></script>
```

### React apps

If your app is built on React, using the React widget is by far the easiest approach.

```jsx
import { WorldIDWidget } from "@worldcoin/id";

<WorldIDWidget
  actionId="wid_staging_PN8fFL7V2N" // obtain this from developer.worldcoin.org
  signal="my_signal"
  enableTelemetry
  onSuccess={(proof) => console.log(proof)}
  onError={(error) => console.error(error)}
  debug={true} // to aid with debugging, remove in production
/>;
```

### Next.js apps

If your app is built on Next.js, you need to disable SSR for the widget. This is because one of the underlying libraries (`kea-js`) that the widget depends on requires `window` which is `undefined` when rendering on the server.

```jsx
import { WidgetProps } from "@worldcoin/id";
const WorldIDWidget =
  dynamic < WidgetProps > (() => import("@worldcoin/id").then((mod) => mod.WorldIDWidget), { ssr: false });

<WorldIDWidget
  actionId="wid_staging_PN8fFL7V2N" // obtain this from developer.worldcoin.org
  signal="my_signal"
  enableTelemetry
  onSuccess={(proof) => console.log(proof)}
  onError={(error) => console.error(error)}
  debug={true} // to aid with debugging, remove in production
/>;
```

### Generic JS apps

If your app doesn't have a framework or doesn't use React, continue here.

1. Add a `<div>` in your HTML where you'd like to include World ID.

```html
<div id="world-id-container"></div>
```

2. Initialize World ID (please refer to the docs for further customization details).

```js
import worldID from "@worldcoin/id";
worldID.init("world-id-container", {
  action_id: "wid_staging_PN8fFL7V2N", // obtain this from developer.worldcoin.org
  signal: "my_signal",
  on_success: (proof) => console.log(proof),
  on_error: (error) => console.error(error),
  debug: true, // to aid with debugging, remove in production
  enableTelemetry: true,
});
```

### React Native

React Native is currently not supported, but we'll work on adding support in the future.

## 🧑‍💻 Development & testing

If you want to develop or contribute to this project, please refer to the development instructions in the `id` [README](/id/README.md).

<!-- WORLD-ID-SHARED-README-TAG:START - Do not remove or modify this section directly -->
<!-- The contents of this file are inserted to all World ID repositories to provide general context on World ID. -->

## <img align="left" width="28" height="28" src="https://raw.githubusercontent.com/worldcoin/world-id-docs/main/public/images/shared-readme/readme-orb.png" alt="" style="margin-right: 0;" /> About World ID

World ID is a protocol that lets you **prove a human is doing an action only once without revealing any personal data**. Stop bots, stop abuse.

World ID uses a device called the [Orb](https://worldcoin.org/how-the-launch-works) which takes a picture align="center" of a person's iris to verify they are a unique and alive human. The protocol uses [Zero-knowledge proofs](https://id.worldcoin.org/zkp) so no traceable information is ever public.

World ID is meant for on-chain web3 apps, traditional cloud applications, and even IRL verifications.

<div align="center">
  <picture align="center">
    <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/diagram-dark-1.png" />
    <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/diagram-light-1.png" />
    <img width="150px"  />
  </picture>

  <picture align="center">
    <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/diagram-dark-2.png" />
    <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/diagram-light-2.png" />
    <img width="150px"  />
  </picture>

  <picture align="center">
    <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/diagram-dark-3.png" />
    <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/diagram-light-3.png" />
    <img width="150px"  />
  </picture>

  <picture align="center">
    <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/diagram-dark-4.png" />
    <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/diagram-light-4.png" />
    <img width="150px"  />
  </picture>
</div>

### Getting started with World ID

Regardless of how you landed here, the easiest way to get started with World ID is through the the [Dev Portal](https://developer.worldcoin.org).

<a href="https://developer.worldcoin.org">
  <p align="center">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/get-started-dark.png" height="80px" />
      <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/get-started-light.png" height="50px" />
      <img />
    </picture>
  </p>
</a>

### World ID Demos

Want to see World ID in action? We have a bunch of [Examples](https://id.worldcoin.org/examples).

<div dir="row" align="center">
  <a href="https://poap.worldcoin.org/">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/examples/poap-dark.png" width="230px" />
      <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/examples/poap-light.png" width="230px" />
      <img />
    </picture>
  </a>
  <a href="https://human.withlens.app/">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/examples/lens-dark.png" width="230px" />
      <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/examples/lens-light.png" width="230px" />
      <img />
    </picture>
  </a>
  <a href="https://github.com/worldcoin/world-id-discord-bot">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/examples/discord-bot-dark.png" width="230px" />
      <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/examples/discord-bot-light.png" width="230px" />
      <img />
    </picture>
  </a>
  <a href="https://github.com/worldcoin/hyperdrop-contracts">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/examples/hyperdrop-dark.png" width="230px" />
      <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/examples/hyperdrop-light.png" width="230px" />
      <img />
    </picture>
  </a>
  <a href="https://petorbz.com/">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/examples/pet-orbz-dark.png" width="230px" />
      <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/examples/pet-orbz-light.png" width="230px" />
      <img />
    </picture>
  </a>
  <a href="https://example.id.worldcoin.org/">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/examples/mesha-dark.png" width="230px" />
      <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/examples/mesha-light.png" width="230px" />
      <img />
    </picture>
  </a>
</div>

## 📄 Documentation

We have comprehensive docs for World ID at https://id.worldcoin.org/docs.

<a href="https://id.worldcoin.org/docs">
  <p align="center">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/visit-documentation-dark.png" height="80px" />
      <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/visit-documentation-light.png" height="50px" />
      <img />
    </picture>
  </p>
</a>

## 🗣 Feedback

**World ID is in Beta, help us improve!** Please share feedback on your experience. You can find us on [Discord](https://discord.gg/worldcoin), look for the [#world-id](https://discord.com/channels/956750052771127337/968523914638688306) channel. You can also open an issue or a PR directly on this repo.

<a href="https://discord.gg/worldcoin">
  <p align="center">
    <picture align="center">
      <source media="(prefers-color-scheme: dark)" srcset="./public/images/shared-readme/join-discord-dark.png" height="80px" />
      <source media="(prefers-color-scheme: light)" srcset="./public/images/shared-readme/join-discord-light.png" height="50px" />
      <img />
    </picture>
  </p>
</a>

<!-- WORLD-ID-SHARED-README-TAG:END -->

[docs]: https://id.worldcoin.org/docs/js
