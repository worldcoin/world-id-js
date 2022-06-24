# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
