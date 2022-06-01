import { createServer, request } from 'http'
import esbuild from 'esbuild'
import path from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const clients = []

esbuild
  .build({
    banner: { js: '(() => new EventSource("/esbuild").onmessage = () => location.reload())();' },
    bundle: true,
    define: { global: 'window', worldIdJSVersion: JSON.stringify(version) },
    entryPoints: [path.join(path.resolve('.'), 'src', 'index.tsx')],
    globalName: 'worldID',
    inject: ['./esbuild/preact-shim.js'],
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    logLevel: 'info',
    outfile: 'dist/world-id-dev.js',
    sourcemap: 'inline',
    target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
    plugins: [
      NodeGlobalsPolyfillPlugin({
        process: true,
        buffer: true,
      }),
    ],
    watch: {
      onRebuild(error) {
        clients.forEach((response) => response.write('data: update\n\n'))
        clients.length = 0

        if (error) {
          console.log(error)
        }
      },
    },
  })
  .catch(() => process.exit(1))

esbuild.serve({ servedir: './' }, {}).then(() => {
  createServer((serverRequest, serverResponse) => {
    const { url, method, headers } = serverRequest

    if (serverRequest.url === '/esbuild') {
      return clients.push(
        serverResponse.writeHead(200, {
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'Content-Type': 'text/event-stream',
        })
      )
    }

    serverRequest.pipe(
      request(
        {
          headers,
          hostname: '0.0.0.0',
          method,
          path: ~url.split('/').pop().indexOf('.') ? url : '/src/index.html',
          port: 8000,
        },
        (proxyResponse) => {
          serverResponse.writeHead(proxyResponse.statusCode, proxyResponse.headers)
          proxyResponse.pipe(serverResponse, { end: true })
        }
      ),
      { end: true }
    )
  }).listen(3000)

  console.log('Server started at: http://localhost:3000')
})
