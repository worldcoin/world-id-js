# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.5.0 (2022-08-16)


### ⚠ BREAKING CHANGES

* react widget (#33)
* correct padding on hashed hex strings (#22)
* use snake_case everywhere (#20)
* encode and hash action ID & signal (#19)
* updates QR code structure to use universal link (#13)
* rename action ID & uniqueness hash (#5)

### Features

* export utils ([#28](https://github.com/worldcoin/world-id-js/issues/28)) ([9e4caa9](https://github.com/worldcoin/world-id-js/commit/9e4caa9d16ca1626c71f395cfcd7b891d6c58e2c))
* handle PostHog errors gracefully ([#29](https://github.com/worldcoin/world-id-js/issues/29)) ([cbbf4c0](https://github.com/worldcoin/world-id-js/commit/cbbf4c0c3d06914f4085f08f0d54c89bcad187f1))
* implement widget dropdown ([#24](https://github.com/worldcoin/world-id-js/issues/24)) ([87cabc9](https://github.com/worldcoin/world-id-js/commit/87cabc945a83bc10dc71825c5db0ab4f857a5d3a))
* react widget ([#33](https://github.com/worldcoin/world-id-js/issues/33)) ([a58178b](https://github.com/worldcoin/world-id-js/commit/a58178b726472b1f8cd70c185d312754f42c5196))
* share build qr data snippet ([#43](https://github.com/worldcoin/world-id-js/issues/43)) ([63e27d0](https://github.com/worldcoin/world-id-js/commit/63e27d04fcc73eaed14e7e7b11a66e9c9b835710))
* upgrade to kea v3 ([#12](https://github.com/worldcoin/world-id-js/issues/12)) ([596f3b6](https://github.com/worldcoin/world-id-js/commit/596f3b6e24e889fcd6c667c2e183b2e69c723e9b))


### Bug Fixes

* correct padding on hashed hex strings ([#22](https://github.com/worldcoin/world-id-js/issues/22)) ([919624c](https://github.com/worldcoin/world-id-js/commit/919624cba3fda54f6236e817f758bae5f4961f6e))
* dynamic modal height transition ([75d590d](https://github.com/worldcoin/world-id-js/commit/75d590de97d4f0e6870e51efb5ca490b44e80e3b))
* Fix README images ([#36](https://github.com/worldcoin/world-id-js/issues/36)) ([19452b5](https://github.com/worldcoin/world-id-js/commit/19452b58bd606a7a166b7d9cb59bfb045b37287b))
* margins on SDK modal ([#7](https://github.com/worldcoin/world-id-js/issues/7)) ([0241c16](https://github.com/worldcoin/world-id-js/commit/0241c161d3b82e3c09fdcfb812bc7ed6f72ac990))
* modal position ([67e48ce](https://github.com/worldcoin/world-id-js/commit/67e48ce30a4a3a15ad5d689b2468a27b53e1e2d2))


* encode and hash action ID & signal ([#19](https://github.com/worldcoin/world-id-js/issues/19)) ([a829d27](https://github.com/worldcoin/world-id-js/commit/a829d2753116dc3d0d026de81d2704fcf0a138ae))
* rename action ID & uniqueness hash ([#5](https://github.com/worldcoin/world-id-js/issues/5)) ([661f0c3](https://github.com/worldcoin/world-id-js/commit/661f0c3285c2bebe83d2a23819d7b09cb8a0ed0a))
* updates QR code structure to use universal link ([#13](https://github.com/worldcoin/world-id-js/issues/13)) ([a3828d9](https://github.com/worldcoin/world-id-js/commit/a3828d9b361019ba95ea08313fb7b03105b1dcbf))
* use snake_case everywhere ([#20](https://github.com/worldcoin/world-id-js/issues/20)) ([c8c9ea5](https://github.com/worldcoin/world-id-js/commit/c8c9ea5793e6284707fd0f5c43850191c1f304b6))

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
