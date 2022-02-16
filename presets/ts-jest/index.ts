import * as utils from "~/lib/utils"

export function tsJestPreset() {
  utils.title(`Preset ts-jest`)
  utils.addDevDeps(["jest", "ts-jest", "@types/jest"])
  utils.copyLocalFiles([
    "jest.config.js",
    "jest.fast.config.js",
    "jest.setup.js",
    "tsconfig.base.json",
    "tsconfig.custom.json",
    "tsconfig.ts-jest.json",
  ])
  utils.addScripts({
    "--- test": "#",
    "test:once": "jest --config=jest.config.js",
    "test:watch": "jest --watch --config=jest.fast.config.js",
    "test:watch:types": "jest --watch --config=jest.config.js",
    "test:clearcache": "jest --clearCache",
  })
}

export default tsJestPreset
