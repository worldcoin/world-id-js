# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.9.2](https://github.com/worldcoin/world-id-js/compare/v0.9.1...v0.9.2) (2022-09-29)


### Bug Fixes

* install now link not working ([#73](https://github.com/worldcoin/world-id-js/issues/73)) ([5c69bc4](https://github.com/worldcoin/world-id-js/commit/5c69bc4cdd1e82cd97cfba4139e58c3ada9f91b1))

### [0.9.1](https://github.com/worldcoin/world-id-js/compare/v0.9.0...v0.9.1) (2022-09-29)

### Bug Fixes

- downgrade framer/motion to support React v17 ([#72](https://github.com/worldcoin/world-id-js/issues/72)) ([7b495cc](https://github.com/worldcoin/world-id-js/commit/7b495cc8841872116dfa05514c96ce9eb3aae5ab))

## 0.9.0 (2022-09-29)

**This version only supports React v18 or above.**

### ⚠ BREAKING CHANGES

- explicit debug mode & fix #66 (#71)

### Features

- add return_to to mobile QR ([#68](https://github.com/worldcoin/world-id-js/issues/68)) ([3b46d4c](https://github.com/worldcoin/world-id-js/commit/3b46d4c67dcc45e03a15ec5575e9e2e9f6c515ea))
- animations I 🪄🧞 ([#60](https://github.com/worldcoin/world-id-js/issues/60)) ([a48b790](https://github.com/worldcoin/world-id-js/commit/a48b79076c60cfeded0f34efd78c1b6b89da64d1))
- explicit debug mode & fix [#66](https://github.com/worldcoin/world-id-js/issues/66) ([#71](https://github.com/worldcoin/world-id-js/issues/71)) ([a77f5a9](https://github.com/worldcoin/world-id-js/commit/a77f5a91f48a51921e93be1223fe5bedd054960f))
- storybook ([#58](https://github.com/worldcoin/world-id-js/issues/58)) ([d084486](https://github.com/worldcoin/world-id-js/commit/d08448646937a57ef5ce2dbbf8e850ae98d5e9c0))

### Bug Fixes

- deeplink button ([#56](https://github.com/worldcoin/world-id-js/issues/56)) ([da548c7](https://github.com/worldcoin/world-id-js/commit/da548c7d8cfc69ec71df438e2f408be58d4e6962))
- re-init connection when disconnect with error ([#61](https://github.com/worldcoin/world-id-js/issues/61)) ([962fb67](https://github.com/worldcoin/world-id-js/commit/962fb670d3937368c2b5b69aaf32822e5212c722))

## 0.9.0-alpha.0 (2022-09-26)

### Features

- add return_to to mobile QR ([#68](https://github.com/worldcoin/world-id-js/issues/68)) ([3b46d4c](https://github.com/worldcoin/world-id-js/commit/3b46d4c67dcc45e03a15ec5575e9e2e9f6c515ea))

## 0.8.0 (2022-08-18)

### Bug Fixes

- Fix React peer dependencies

## 0.7.0 (2022-08-18)

### Features

- log param errors ([#49](https://github.com/worldcoin/world-id-js/issues/49)) ([27b5305](https://github.com/worldcoin/world-id-js/commit/27b5305768e48f675f3aab8ea19464652a06b82d))
- use portal for overlay ([#50](https://github.com/worldcoin/world-id-js/issues/50)) ([5be7872](https://github.com/worldcoin/world-id-js/commit/5be78726a156f724f0713ade7376b97cde926003))

## 0.6.0 (2022-08-17)

### ⚠ BREAKING CHANGES

- fix encoding for raw bytes (#47)

### Bug Fixes

- fix encoding for raw bytes ([#47](https://github.com/worldcoin/world-id-js/issues/47)) ([d1206f8](https://github.com/worldcoin/world-id-js/commit/d1206f81b766c024023d0759b94e071a12cc80c2))

## 0.5.0 (2022-08-16)

### Features

- Share build qr data snippet ([#43](https://github.com/worldcoin/world-id-js/issues/43)) ([63e27d0](https://github.com/worldcoin/world-id-js/commit/63e27d04fcc73eaed14e7e7b11a66e9c9b835710))

### Style

- Fix and improve styles ([#42](https://github.com/worldcoin/world-id-js/pull/42)) ([c3c0ec1](https://github.com/worldcoin/world-id-js/commit/c3c0ec1c7fb2bd8342c525a7f130ef18884ac5e8))

## 0.4.0 (2022-08-10)

Revamped UI, native React widget and much more!

### ⚠ BREAKING CHANGES

- Introducing React widget, some parameter names may have changed slightly (see updated README) (#33)

### Features

- React widget introduced. Recommended over vanilla implementation if you are using React! (#33) (#28)
- New widget design (#17) (#25) (#24)
- Updated READMEs to make it easier to use World ID (#38) (#36)
- Telemetry errors are now gracefully handled (#29)

## 0.4.0-alpha.[1-3] (2022-08-10)

No details for alpha releases.

## 0.4.0-alpha.0 (2022-08-01)

No details for alpha releases.

## 0.3.0 (2022-06-16)

Critical update to ensure proper interaction with WLD apps.

### ⚠ BREAKING CHANGES

- correct padding on hashed hex strings (#22)

### Bug Fixes

- correct padding on hashed hex strings ([#22](https://github.com/worldcoin/world-id-js/issues/22)) ([919624c](https://github.com/worldcoin/world-id-js/commit/919624cba3fda54f6236e817f758bae5f4961f6e))

## 0.2.0 (2022-06-16)

**Do not use this version!** It will not work properly with WLD apps.

### ⚠ BREAKING CHANGES

- use snake_case everywhere (#20)
- encode and hash action ID & signal (#19)

### Features

### Bug Fixes

- encode and hash action ID & signal ([#19](https://github.com/worldcoin/world-id-js/issues/19)) ([a829d27](https://github.com/worldcoin/world-id-js/commit/a829d2753116dc3d0d026de81d2704fcf0a138ae))
- use snake_case everywhere ([#20](https://github.com/worldcoin/world-id-js/issues/20)) ([c8c9ea5](https://github.com/worldcoin/world-id-js/commit/c8c9ea5793e6284707fd0f5c43850191c1f304b6))

## 0.1.0 (2022-06-10)

### ⚠ BREAKING CHANGES

- Updates QR code structure to use universal link ([#13](https://github.com/worldcoin/world-id-js/issues/13)) ([a3828d9](https://github.com/worldcoin/world-id-js/commit/a3828d9b361019ba95ea08313fb7b03105b1dcbf))
- Renames action ID & uniqueness hash ([#5](https://github.com/worldcoin/world-id-js/issues/5)) ([661f0c3](https://github.com/worldcoin/world-id-js/commit/661f0c3285c2bebe83d2a23819d7b09cb8a0ed0a))

### Features

- Upgrade to kea v3 & removes React dependencies reducing bundle size ([#12](https://github.com/worldcoin/world-id-js/issues/12)) ([596f3b6](https://github.com/worldcoin/world-id-js/commit/596f3b6e24e889fcd6c667c2e183b2e69c723e9b))

### Bug Fixes

- Dynamic modal height transition ([75d590d](https://github.com/worldcoin/world-id-js/commit/75d590de97d4f0e6870e51efb5ca490b44e80e3b))
- Margins on SDK modal ([#7](https://github.com/worldcoin/world-id-js/issues/7)) ([0241c16](https://github.com/worldcoin/world-id-js/commit/0241c161d3b82e3c09fdcfb812bc7ed6f72ac990))
- Modal position ([67e48ce](https://github.com/worldcoin/world-id-js/commit/67e48ce30a4a3a15ad5d689b2468a27b53e1e2d2))

## 0.0.2 (2022-05-02)

### ⚠ BREAKING CHANGES

- Rename action ID & signal ([#5](https://github.com/worldcoin/world-id-js/issues/5)) ([661f0c3](https://github.com/worldcoin/world-id-js/commit/661f0c3285c2bebe83d2a23819d7b09cb8a0ed0a))

- Removes ABI encoding requirement for all input parameters.

## 0.0.1 (2022-04-19)

Initial version.
