import esbuild from 'esbuild'
import path from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { clean } from 'esbuild-plugin-clean'
import meow from 'meow'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const cli = meow({
  flags: { platform: { type: 'string', alias: 'p', isRequired: true } },
  importMeta: import.meta,
})

const baseConfig = {
  bundle: true,
  define: { global: 'window', worldIdJSVersion: JSON.stringify(version) },
  entryPoints: [path.join(path.resolve('.'), 'src', 'index.tsx')],
  inject: ['./esbuild/preact-shim.js'],
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  logLevel: 'info',
  minify: true,

  plugins: [
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true,
    }),
  ],

  target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
}

const configs = {
  esm: {
    ...baseConfig,
    plugins: [
      clean({
        patterns: ['./dist/index.js'],
      }),
      ...baseConfig.plugins,
    ],
    format: 'esm',
    outfile: 'dist/index.js',
  },

  cjs: {
    ...baseConfig,
    plugins: [
      clean({
        patterns: ['./dist/index.cjs'],
      }),

      ...baseConfig.plugins,
    ],

    format: 'cjs',
    outfile: 'dist/index.cjs',
  },

  iife: {
    ...baseConfig,

    plugins: [
      clean({
        patterns: ['./dist/world-id.js'],
      }),

      ...baseConfig.plugins,
    ],

    format: 'iife',
    globalName: 'worldID',
    outfile: 'dist/world-id.js',
  },
}

if (!configs[cli.flags.platform]) {
  console.error(`Unknown platform. Use one of ${Object.keys(configs)}`)
}

try {
  await esbuild.build(configs[cli.flags.platform])
} catch (error) {
  console.error(error)
  process.exit(1)
}
