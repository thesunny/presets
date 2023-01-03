import * as utils from "~/lib/utils"
import tsJestPreset from "../ts-jest"
import * as core from "mrm-core"
import lintPreset from "../lint"
import gitignorePreset from "../gitignore"
import { sortPackagePreset } from "../sort-package"
import { tsNodePreset } from "../ts-node"

export function npmTsPreset() {
  utils.title(`Preset NPM`)

  utils.task("Set main, types and files in package.json")
  const pkg = core.packageJson()
  const pkgName = pkg.get("name")
  pkg
    .merge({
      main: ".dist/src/index.js",
      types: ".dist/src/index.d.ts",
      files: [".dist/**/*"],
    })
    .save()
  utils.pass("Done")

  gitignorePreset()
  tsNodePreset()
  tsJestPreset()
  lintPreset()
  utils.copyLocalFiles(["tsconfig.tsc.json"])
  utils.copyLocalFiles(["src/index.ts", "src/test/index.test.ts"], {
    exists: "skip",
  })

  utils.addDevDeps(["tsc"])
  utils.addDevDeps({ concurrently: "^7.2" })

  utils.addScripts({
    "--- npm": "# build npm",
    "build:npm": "rm -rf ./.dist/ && tsc -p tsconfig.tsc.json",

    "publish:npm":
      "yarn lint && yarn test:once && yarn build:npm && yarn publish || echo '\"npm publish --access=public' to publish to npm",
  })
  utils.title(
    `Don't forget to set name in "package.json"\nCurrently: ${pkgName}`
  )
  sortPackagePreset()
}

export default npmTsPreset
