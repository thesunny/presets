import * as utils from "~/lib/utils"
import tsJestPreset from "../ts-jest"
import * as core from "mrm-core"

export default function cliPreset() {
  utils.title(`Preset CLI`)

  /**
   * Gets us TypeScript and Jest
   */
  tsJestPreset()
  utils.copyLocalFiles(["tsconfig.rollup.json", "cli/index.ts"])
  utils.addDevDeps({
    "@rollup/plugin-commonjs": "^17.0.0",
    "@rollup/plugin-json": "^4.1.0",
    "@rollup/plugin-node-resolve": "^13.0.6",
    rollup: "^2.59.0",
    "rollup-plugin-sizes": "^1.0.4",
    "rollup-plugin-terser": "^7.0.2",
    "rollup-plugin-typescript2": "^0.30.0",
  })

  utils.task("Set main to .npm/src/index.js")

  const pkg = core.packageJson()
  const pkgName = pkg.get("name")
  pkg
    .merge({
      bin: {},
    })
    .save()
  utils.pass("Done")

  utils.addScripts({
    "--- npm": "# npm package scripts",
    "build:once":
      "rm -rf ./.npm/ && tsc -p tsconfig.ts-build.json && echo 'Finished Building'",
    "build:watch": "rm -rf ./.npm/ && tsc -p tsconfig.ts-build.json --watch",
    "publish:patch":
      "yarn test:once && yarn build:once && yarn version --patch && echo '\"npm publish --access=public\" to publish to npm'",
  })
  utils.title(
    `Don't forget to set name in "package.json"\nCurrently: ${pkgName}`
  )
}
