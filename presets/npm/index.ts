import * as utils from "~/lib/utils"
import tsJestPreset from "../ts-jest"
import * as core from "mrm-core"

export default function npmPreset() {
  utils.title(`Preset NPM`)
  tsJestPreset()
  utils.copyLocalFiles(["tsconfig.ts-build.json"])
  utils.copyLocalFiles(["src/index.ts", "src/test/index.test.ts"], {
    exists: "skip",
  })
  utils.addDevDeps(["tsc"])
  utils.task("Set main to .dist/src/index.js")

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

  utils.addScripts({
    "--- npm": "# npm package scripts",
    "build:npm:once":
      "rm -rf ./.dist/ && yarn test:once && tsc -p tsconfig.ts-build.json && echo 'Finished Building'",
    "build:npm:watch":
      "rm -rf ./.dist/ && tsc -p tsconfig.ts-build.json --watch",
    "publish:npm": "yarn publish:npm:patch",
    "publish:npm:patch":
      "yarn build:npm:once && yarn version --patch && yarn publish --non-interactive || echo '\"npm publish --access=public\" to publish to npm'",
  })
  utils.title(
    `Don't forget to set name in "package.json"\nCurrently: ${pkgName}`
  )
}
