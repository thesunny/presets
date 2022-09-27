import * as utils from "~/lib/utils"
import tsJestPreset from "../ts-jest"
import * as core from "mrm-core"
import lintPreset from "../lint"
import gitignorePreset from "../gitignore"
import { sortPackagePreset } from "../sort-package"

export default function npmPreset() {
  utils.title(`Preset Microbundle`)

  utils.task("Set main, types and files in package.json")
  const pkg = core.packageJson()
  const pkgName = pkg.get("name")
  pkg
    .merge({
      source: "src/index.ts",
      main: "./.dist/index.js",
      exports: {
        types: "./.dist/src/index.d.ts",
        require: "./.dist/index.js",
      },
      types: "./.dist/src/index.d.ts",
      files: [".dist/**/*"],
    })
    .save()
  utils.pass("Done")

  gitignorePreset()
  tsJestPreset()
  lintPreset()
  utils.copyLocalFiles([
    "tsconfig.base.json",
    "tsconfig.custom.json",
    "tsconfig.microbundle.json",
  ])
  utils.copyLocalFiles(["src/index.ts", "src/test/index.test.ts"], {
    exists: "skip",
  })

  utils.addDevDeps({ microbundle: "^0.15" })
  // utils.addDevDeps(["tsc"])
  // utils.addDevDeps({ concurrently: "^7.2" })

  utils.addScripts({
    "--- build": "# build npm with microbundle",
    "build:npm":
      "rm -rf ./.dist/ && microbundle --compress=false --tsconfig=tsconfig.json",
    "publish:npm":
      "yarn lint && yarn test:once && yarn build:npm && yarn publish || echo 'type \"npm publish --access=public\" for first publish'",
    //   "build:once":
    //     "yarn build:clear && yarn test:once && concurrently 'yarn build:cjs' 'yarn build:mjs' && echo 'Finished Building'",
    //   "build:watch": "build:clear && tsc -p tsconfig.ts-build.json --watch",
    //   "build:clear": "rm -rf ./.dist/",
    //   "build:cjs": "tsc -p tsconfig.build-cjs.json",
    //   "build:mjs": "tsc -p tsconfig.build-mjs.json",
    //   "-- publish npm": "# publish npm package",
    //   "publish:npm": "yarn build:once && yarn publish || yarn publish:first",
    //   "publish:npm:patch":
    //     "yarn build:once && yarn version --patch && yarn publish --non-interactive || yarn publish:first",
    //   "publish:first":
    //     "echo 'IMPORTANT INSTRUCTIONS: This is first publish so please use:\n\n\"npm publish --access=public\"'",
  })
  utils.title(
    `Don't forget to set name in "package.json"\nCurrently: ${pkgName}`
  )
  sortPackagePreset()
}
