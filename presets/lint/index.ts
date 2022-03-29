import * as utils from "~/lib/utils"

export function lintPreset() {
  utils.title(`Preset lint`)

  /**
   * Copy configuration files verbatim
   */
  utils.copyLocalFiles([".prettierrc", ".eslintrc.js"])

  utils.syncLines(".prettierignore")
  utils.syncLines(".eslintignore")

  utils.addDevDeps({
    "@typescript-eslint/eslint-plugin": "^5.15.0",
    "@typescript-eslint/parser": "^5.15.0",
    eslint: "^8.4.1",
    "eslint-config-prettier": "^8.1.0",
    "eslint-plugin-no-secrets": "^0.8.9",
    "eslint-plugin-react": "^7.27.1",
  })

  /**
   * Add fix and lint scripts
   */
  utils.addScripts({
    "-- fix": "# fix syntax",
    "fix:prettier": "yarn lint:prettier --write",
    "fix:eslint": "yarn lint:eslint --fix",
    "-- lint": "# lint syntax",
    lint: "yarn lint:prettier && yarn lint:eslint && yarn lint:tsc",
    "lint:prettier": 'prettier --check "**/*.{css,md,js,jsx,json,ts,tsx}"',
    "lint:eslint": "eslint .",
    "lint:tsc": "tsc --build ./ --force",
  })
}

export default lintPreset
