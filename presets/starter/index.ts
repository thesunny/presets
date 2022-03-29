import * as utils from "~/lib/utils"
import { lintPreset } from "~/presets/lint"
import { gitignorePreset } from "~/presets/gitignore"

export function starterPreset() {
  utils.title(`Preset Starter`)
  lintPreset()
  gitignorePreset()
}

export default starterPreset
