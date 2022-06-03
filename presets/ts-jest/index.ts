import * as utils from "~/lib/utils"

export function tsJestPreset() {
  utils.title(`Preset ts-jest`)
  utils.addDevDeps(["jest@^27", "ts-jest@^27", "@types/jest@^27"])
  utils.copyLocalFiles([
    "jest.config.js",
    "jest.fast.config.js",
    "jest.setup.js",
    "jest.esm-modules.js",
    "tsconfig.json",
    "tsconfig.base.json",
    "tsconfig.custom.json",
    "tsconfig.ts-jest.json",
  ])
  utils.addScripts({
    "--- test": "#",
    "test:once": "yarn test:clearcache && jest --config=jest.config.js",
    "test:watch": "jest --watch --config=jest.fast.config.js",
    "test:watch:types":
      "yarn test:clearcache && jest --watch --config=jest.config.js",
    "test:clearcache": "jest --clearCache",
  })
}

export default tsJestPreset
