import * as utils from "~/lib/utils"

export function typescriptPreset() {
  utils.title(`Preset TypeScript`)
  utils.addDevDeps(["typescript", "@types/node"])
  utils.copyLocalFiles([
    "tsconfig.base.json",
    "tsconfig.custom.json",
    "tsconfig.json",
  ])
}

export default typescriptPreset
