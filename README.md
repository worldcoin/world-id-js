# ⚠️ DEPRECATION NOTICE

This package has been deprecated in favor of [IDKit](https://github.com/worldcoin/idkit-js) and is no longer supported. Using this package will **not work anymore** with the World App, Simulator or Developer Portal. Please use IDKit instead and thank you for contributing to World ID Alpha.

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
