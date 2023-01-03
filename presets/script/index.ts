import * as utils from "~/lib/utils"
import npmTsPreset from "../npm-tsc"

export function scriptPreset() {
  utils.title(`Preset Script`)

  npmTsPreset()

  utils.title(
    `This preset is incomplete. Installed Build and TS Node. Make sure to add bin scripts.`
  )
}

export default scriptPreset
