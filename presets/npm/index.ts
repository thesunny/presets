import * as utils from "~/lib/utils"
import tsJestPreset from "../ts-jest"

export default function npmPreset() {
  utils.title(`Preset NPM`)
  tsJestPreset()
  utils.addDevDeps(["tsc"])
  utils.addScripts({
    build:
      "rm -rf ./.dist/ && tsc -p tsconfig.ts-build.json && echo 'Finished Building'",
    "publish:patch":
      "yarn test:once && yarn build && yarn version --patch && echo '\"npm publish --access=public\" to publish to npm'",
  })
  utils.title("You aren't done yet. Reminders below.")
  utils.task(`Set "name" in "package.json"`)
}
