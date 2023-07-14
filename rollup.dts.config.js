// @ts-check
import { existsSync, readdirSync } from 'fs'
import dts from 'rollup-plugin-dts'

if (!existsSync('temp/packages')) {
  console.warn(
    'no temp dts files found. run `tsc -p tsconfig.build.json` first.'
  )
  process.exit(1)
}

const packages = readdirSync('temp/packages')
const targets = process.env.TARGETS ? process.env.TARGETS.split(',') : null
const targetPackages = targets
  ? packages.filter(pkg => targets.includes(pkg))
  : packages


export default targetPackages.map(pkg => {
  return {
    input: `./temp/packages/${pkg}/src/index.d.ts`,
    output: {
      file: `packages/${pkg}/dist/${pkg}.d.ts`,
      fromat: 'es'
    },
    plugins: [dts()],
  }
})
  