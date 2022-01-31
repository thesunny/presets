import * as utils from "~/lib/utils"

export default function tsconfigPreset() {
  utils.title(`Preset tsconfig`)
  utils.copyLocalFiles([
    "tsconfig.base.json",
    "tsconfig.json",
    "tsconfig.rollup.json",
    "tsconfig.ts-build.json",
    "tsconfig.ts-jest.json",
    "tsconfig.ts-node.json",
  ])
}
