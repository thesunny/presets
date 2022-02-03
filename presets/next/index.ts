import * as utils from "~/lib/utils"
import { tsJestPreset } from "../ts-jest"

export default function nextPreset() {
  utils.title(`Preset next`)
  tsJestPreset()
  utils.copyLocalFiles([
    "tsconfig.base.json",
    "tsconfig.custom.json",
    "tsconfig.json",
  ])
}
