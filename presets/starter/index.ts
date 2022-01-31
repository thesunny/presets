import * as utils from "~/lib/utils"
import { default as prettierrcPreset } from "~/presets/prettierrc"
import { default as gitignorePreset } from "~/presets/gitignore"

export default function starter() {
  utils.title(`Preset Starter`)
  prettierrcPreset()
  gitignorePreset()
}
