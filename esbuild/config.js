import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { createRequire } from 'node:module'
import { transformFileAsync as babelTransformFileAsync } from '@babel/core'
const require = createRequire(import.meta.url)

const packageJson = require('../package.json')

/**
 * @type {import('esbuild').Plugin}
 */
// const preactCompatPlugin = {
//   name: 'preact-compat',
//   setup(build) {
//     build.onResolve({ filter: /^(react-dom|react)$/ }, async (args) => {
//       const preact = await build.resolve('preact/compat', {
//         resolveDir: args.resolveDir,
//         importer: args.importer,
//         kind: args.kind,
//       })
//       return { path: preact.path, sideEffects: false }
//     })
//   },
// }

/**
 * @type {import('esbuild').Plugin}
 */
const babelTransforms = {
  name: 'babelTransformations',
  setup(build) {
    if (!build.initialOptions.minify) return

    build.onLoad({ filter: /\.tsx/i }, async (args) => {
      const result = await babelTransformFileAsync(args.path, {
        plugins: [
          ['@babel/plugin-syntax-typescript', { isTSX: true }],
          [
            'babel-plugin-styled-components',
            {
              ssr: false,
              displayName: false,
              fileName: false,
              minify: true,
              transpileTemplateLiterals: false,
              pure: true,
            },
          ],
        ],
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
    global: 'window',
    worldIdJSVersion: JSON.stringify(packageJson.version),
  },
  entryPoints: [require.resolve('../src/index.tsx')],
  globalName: 'worldID',
  // inject: [require.resolve('./preact-shim.js')],
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
  plugins: [
    NodeGlobalsPolyfillPlugin({
      process: false,
      buffer: true,
    }),
    // preactCompatPlugin,
    babelTransforms,
  ],
})
