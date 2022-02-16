import * as utils from "~/lib/utils"

export function eslintExample() {
  utils.title(`Preset eslint`)

  /**
   * Init .prettierrc
   */
  utils.copyLocalFiles([".eslintrc.js"])

  /**
   * Init .prettierignore
   */
  utils.syncLines(".eslintignore")

  /**
   * Install prettier
   *
   * FIXME:
   *
   * For some reason this continually fails to finish (just locks up)
   * on the `wysimark-admin` repo.
   */
  utils.addDevDeps({
    "@typescript-eslint/eslint-plugin": "^5.11.0",
    "@typescript-eslint/parser": "^5.11.0",
    eslint: "^6.7.1",
    "eslint-config-prettier": "^6.7.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-prettier": "^3.1.1",
    "eslint-plugin-react": "^7.16.0",
  })

  /**
   * Add fix and lint scripts
   */
  utils.addScripts({
    "-- fix": "# fix syntax",
    "fix:eslint": "yarn lint:eslint --fix",
    "-- lint": "# lint syntax",
    "lint:eslint": 'eslint "./**/*.{js,jsx,ts,tsx}"',
  })
}

export default eslintExample
