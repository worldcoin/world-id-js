import esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
import meow from 'meow'

import config from './config.js'

const cli = meow({
  flags: { platform: { type: 'string', alias: 'p', isRequired: true } },
  importMeta: import.meta,
})

/** @type {import('esbuild').BuildOptions} */
const baseConfig = {
  ...config,
  minify: true,
  treeShaking: true,
  define: {
    ...config.define,
    'process.env.NODE_ENV': "'production'",
    'import.meta.env': '{ "MODE": "production" }',
  },
}

/** @type {Record<string, import('esbuild').BuildOptions>} */
const configs = {
  esm: {
    ...baseConfig,
    plugins: [
      clean({
        patterns: ['./dist/index.js'],
      }),
      ...baseConfig.plugins,
    ],
    sourcemap: true,
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
