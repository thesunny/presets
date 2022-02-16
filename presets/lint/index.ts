import * as utils from "~/lib/utils"

export function lintPreset() {
  utils.title(`Preset lint`)

  /**
   * Add fix and lint scripts
   */
  utils.addScripts({
    "-- fix": "# fix syntax",
    "fix:prettier": "yarn lint:prettier --write",
    "-- lint": "# lint syntax",
    lint: "yarn lint:prettier && yarn lint:tsc",
    "lint:prettier": 'prettier --check "**/*.{css,md,js,jsx,json,ts,tsx}"',
    "lint:tsc": "tsc --build ./ --force",
  })
}

export default lintPreset
