import { dirname, resolve } from 'path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'url'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import polyfillNode from 'rollup-plugin-polyfill-node'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'

const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const packagesDir = resolve(__dirname, 'packages')
const target = process.env.TARGET
const packageDir = resolve(packagesDir, target)
const resolvePackage = p => resolve(packageDir, p)

const pkg = require(resolvePackage('package.json'))
const pkgOptions = pkg.buildOptions || {}
const name = pkgOptions.name || dirname(packageDir)

const outputConfig = {
    "esm-bundler": {
        file: resolvePackage(`dist/${target}.esm-bundler.js`),
        fromat: 'es'
    },
    cjs: {
        file: resolvePackage(`dist/${target}.cjs.js`),
        fromat: 'cjs'
    },
    global: {
        file: resolvePackage(`dist/${target}.global.js`),
        fromat: 'iife'
    }
}

const packagefromats = pkgOptions.fromats
const packageConfigs = packagefromats.map(fromat => createConfig(fromat, outputConfig[fromat]))

export default packageConfigs

function createConfig(fromat, output) {
    const isNodeBuild = fromat === 'cjs'
    const isGlobalBuild = fromat === 'global'
    const isBundlerESMBuild = /esm-bundler/.test(fromat)

    function resolveDefine() {
        return {
            __VERSION__: `"${pkg.version}"`,
            __GLOBAL__: String(isGlobalBuild),
            __ESM_BUNDLER__: String(isBundlerESMBuild)
        }
    }

    output.exports = 'named'

    if (isNodeBuild) {
        output.esModule = true
    }
    output.externalLiveBindings = false
    if (isGlobalBuild) {
        output.name = name
    }

    return {
        input: resolvePackage('src/index.ts'),
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {})
        ],
        plugins: [
            json({ namedExports: false }),
            alias({
                entries: {
                    '@zs/relation': resolve(__dirname, 'packages/relation/src/index.ts'),
                    '@zs/relation-utils': resolve(__dirname, 'packages/utils/src/index.ts'),
                    '@zs/relation-compute': resolve(__dirname, 'packages/compute/src/index.ts'),
                }
            }),
            esbuild({
                tsconfig: resolve(__dirname, 'tsconfig.json'),
                sourceMap: false,
                minify: false,
                target: isNodeBuild ? 'es2019' : 'es2015',
                define: resolveDefine()
            }),
            commonjs({
                sourceMap: false
            }),
            ...(fromat === 'cjs' ? [] : [polyfillNode()]),
            nodeResolve(),
        ],
        output
    }
}