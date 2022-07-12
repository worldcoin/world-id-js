import { createServer, request } from 'http'
import esbuild from 'esbuild'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import meow from 'meow'

import config from './config.js'

const clients = []

const cli = meow({
  flags: { variant: { type: 'string', alias: 'v', isRequired: false, default: 'browser' } },
  importMeta: import.meta,
})

const variants = {
  react: {
    entryPoint: require.resolve('../src/react-widget/index.tsx'),
    html: '/src/react-widget/index.html',
    serveDir: './',
  },
  browser: {
    entryPoint: require.resolve('../src/browser.tsx'),
    html: '/src/index.html',
    serveDir: './',
  },
}
console.log(variants[cli.flags.variant])

esbuild
  .build({
    ...config,

    entryPoints: [variants[cli.flags.variant].entryPoint],
    banner: { js: '(() => new EventSource("/esbuild").onmessage = () => location.reload())();' },
    outfile: 'dist/world-id-dev.js',
    sourcemap: 'inline',
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

esbuild.serve({ servedir: variants[cli.flags.variant].serveDir }, {}).then(() => {
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
          path: ~url.split('/').pop().indexOf('.') ? url : variants[cli.flags.variant].html,
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
