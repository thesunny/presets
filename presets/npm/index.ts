import * as utils from "~/lib/utils"
import tsJestPreset from "../ts-jest"
import * as core from "mrm-core"

export default function npmPreset() {
  utils.title(`Preset NPM`)
  tsJestPreset()
  utils.copyLocalFiles(["tsconfig.ts-build.json", "src/index.ts"])
  utils.addDevDeps(["tsc"])
  utils.task("Set main to .npm/src/index.js")

  const pkg = core.packageJson()
  const pkgName = pkg.get("name")
  pkg
    .merge({
      main: ".npm/src/index.js",
      types: ".npm/src/index.d.ts",
      files: [".npm/**/*"],
    })
    .save()
  utils.pass("Done")

  utils.addScripts({
    "--- npm": "# npm package scripts",
    "build:npm:once":
      "rm -rf ./.npm/ && tsc -p tsconfig.ts-build.json && echo 'Finished Building'",
    "build:npm:watch":
      "rm -rf ./.npm/ && tsc -p tsconfig.ts-build.json --watch",
    "publish:npm:patch":
      "yarn test:once && yarn build:npm:once && yarn version --patch && echo '\"npm publish --access=public\" to publish to npm'",
  })
  utils.title(
    `Don't forget to set name in "package.json"\nCurrently: ${pkgName}`
  )
}
