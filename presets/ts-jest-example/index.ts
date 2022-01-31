import * as utils from "~/lib/utils"
import { default as tsJestPreset } from "../ts-jest"

export default function tsnodeExamplePreset() {
  utils.title(`Preset ts-jest-example`)
  tsJestPreset()
  utils.copyLocalFiles([
    "examples/ts-jest/add.ts",
    "examples/ts-jest/add.test.ts",
  ])
}
