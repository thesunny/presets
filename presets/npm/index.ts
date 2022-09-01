import * as utils from "~/lib/utils"
import tsJestPreset from "../ts-jest"
import * as core from "mrm-core"
import lintPreset from "../lint"
import gitignorePreset from "../gitignore"
import { sortPackagePreset } from "../sort-package"

export default function npmPreset() {
  utils.title(`Preset NPM`)

  utils.task("Set main, types and files in package.json")
  const pkg = core.packageJson()
  const pkgName = pkg.get("name")
  pkg
    .merge({
      // main: ".dist/src/index.js",
      // types: ".dist/src/index.d.ts",
      main: ".dist/cjs/src/index.js",
      module: ".dist/mjs/src/index.js",
      types: ".dist/cjs/src/index.d.ts",
      files: [".dist/**/*"],
    })
    .save()
  utils.pass("Done")

  gitignorePreset()
  tsJestPreset()
  lintPreset()
  utils.copyLocalFiles([
    "tsconfig.build-cjs.json",
    "tsconfig.build-mjs.json",
    // "tsconfig.ts-build.json",
  ])
  utils.copyLocalFiles(["src/index.ts", "src/test/index.test.ts"], {
    exists: "skip",
  })

  utils.addDevDeps(["tsc"])
  utils.addDevDeps({ concurrently: "^7.2" })

  utils.addScripts({
    "--- build npm": "# build npm",
    "build:once":
      "yarn build:clear && yarn test:once && concurrently 'yarn build:cjs' 'yarn build:mjs' && echo 'Finished Building'",
    "build:watch": "build:clear && tsc -p tsconfig.ts-build.json --watch",
    "build:clear": "rm -rf ./.dist/",
    "build:cjs": "tsc -p tsconfig.build-cjs.json",
    "build:mjs": "tsc -p tsconfig.build-mjs.json",
    "-- publish npm": "# publish npm package",
    "publish:npm": "yarn build:once && yarn publish || yarn publish:first",
    "publish:npm:patch":
      "yarn build:once && yarn version --patch && yarn publish --non-interactive || yarn publish:first",
    "publish:first":
      "echo 'IMPORTANT INSTRUCTIONS: This is first publish so please use:\n\n\"npm publish --access=public\"'",
  })
  utils.title(
    `Don't forget to set name in "package.json"\nCurrently: ${pkgName}`
  )
  sortPackagePreset()
}
