import * as utils from "~/lib/utils"

export function presetPrettier() {
  utils.title(`Preset prettierrc`)

  /**
   * Init .prettierrc
   */
  utils.copyLocalFiles([".prettierrc"])

  /**
   * Init .prettierignore
   */
  utils.syncLines(".prettierignore")

  /**
   * Install prettier
   */
  utils.addDevDeps(["prettier"])

  /**
   * Add fix and lint scripts
   */
  utils.addScripts({
    "-- fix": "# fix syntax",
    "fix:prettier": "yarn lint:prettier --write",
    "-- lint": "# lint syntax",
    "lint:prettier": 'prettier --check "**/*.{css,md,js,jsx,json,ts,tsx}"',
  })
}

export default presetPrettier
