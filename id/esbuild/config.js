import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { createRequire } from 'node:module'
import { transformFileAsync as babelTransformFileAsync } from '@babel/core'
const require = createRequire(import.meta.url)

const packageJson = require('../package.json')

/**
 * @type {import('esbuild').Plugin}
 */
const babelTransforms = {
  name: 'babelTransformations',
  setup(build) {
    if (!build.initialOptions.minify) return

    build.onLoad({ filter: /\.tsx/i }, async (args) => {
      const result = await babelTransformFileAsync(args.path, {
        plugins: [['@babel/plugin-syntax-typescript', { isTSX: true }]],
        configFile: false,
        babelrc: false,
      })
      return { contents: result.code, loader: 'tsx' }
    })
  },
}

export default /** @type {import('esbuild').BuildOptions} */ ({
  bundle: true,
  loader: { '.svg': 'dataurl', '.png': 'dataurl' },
  logLevel: 'info',
  define: {
    global: 'globalThis',
    worldIdJSVersion: JSON.stringify(packageJson.version),
  },
  entryPoints: [require.resolve('../src/index.ts')],
  globalName: 'worldID',
  inject: [require.resolve('./react-shim.js')],
  target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
  plugins: [
    NodeGlobalsPolyfillPlugin({
      process: false,
      buffer: true,
    }),
    babelTransforms,
  ],
})
