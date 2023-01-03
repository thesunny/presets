import * as utils from "~/lib/utils"

export default function tsconfigPreset() {
  utils.title(`Preset tsconfig`)
  utils.copyLocalFiles([
    "tsconfig.json",
    "tsconfig.base.json",
    "tsconfig.build-cjs.json",
    "tsconfig.build-mjs.json",
    "tsconfig.custom.json",
    "tsconfig.next.json",
    "tsconfig.microbundle.json",
    "tsconfig.rollup.json",
    "tsconfig.ts-build.json",
    "tsconfig.ts-jest.json",
    "tsconfig.ts-node.json",
    "tsconfig.tsc.json",
  ])
}
