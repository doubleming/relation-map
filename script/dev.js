// dev 环境使用esbuild打包，加快开发构建速度
import esbuild from 'esbuild'
import minimist from 'minimist'
import { resolve, dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const args = minimist(process.argv.slice(2))
const target = args._[0] || 'relation'
const format = args.f || 'global'
const pkg = require(`../packages/${target}/package.json`)

const outputFormat = format.startsWith('global')
? 'iife'
: format === 'cjs'
? 'cjs'
: 'esm'

const outfile = resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`)

let external = []

if (['cjs', 'esm'].includes(outputFormat)) {
    external = [
        ...external,
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
    ]
}

esbuild.context({
    entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
    outfile,
    bundle: true,
    external,
    sourcemap: true,
    format: outputFormat,
    globalName: pkg.buildOptions?.name,
    platform: format === 'cjs' ? 'node' : 'browser'
}).then(ctx => ctx.watch())
