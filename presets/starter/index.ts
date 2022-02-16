import * as utils from "~/lib/utils"
import { prettierPreset } from "~/presets/prettier"
import { gitignorePreset } from "~/presets/gitignore"

export function starterPreset() {
  utils.title(`Preset Starter`)
  prettierPreset()
  gitignorePreset()
}

export default starterPreset
