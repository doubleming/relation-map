// dev 生成环境使用rollup打包js
import minimist from 'minimist'
import { resolve } from 'path'
import { createRequire } from 'module'
import { readdirSync, statSync, existsSync, rmSync } from 'node:fs'
import { execa } from 'execa'
const require = createRequire(import.meta.url)
const args = minimist(process.argv.slice(2))
const targets = args._

run()

function getTargets() {
    if (targets.length === 0) {
        // 打包所有的packages下的包
        return readdirSync('packages').filter(f => {
            if (!statSync(`packages/${f}`).isDirectory()) {
                return false
            }
            const pkg = require(`../packages/${f}/package.json`)
            if (pkg.private && !pkg.buildOptions) {
                return false
            }

            return true
        })
    } else {
        // 打包targets配置的包
        return targets
    }
}

async function run() {
    const targetList = getTargets()

    await runParallel(targetList, build)
}

async function runParallel(sourceList, iteratorFn) {
    const ret = []
    for (const source of sourceList) {
        ret.push(iteratorFn(source))
    }
    await Promise.all(ret)
}


async function build(target) {
    const pkgDir = resolve(`packages/${target}`)
    const pkg = require(`${pkgDir}/package.json`)
    if (pkg.private) return
    if (existsSync(`${pkgDir}/dist`)) {
        rmSync(`${pkgDir}/dist`, { recursive: true })
    }

    await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
        stdio: 'inherit'
    })
}