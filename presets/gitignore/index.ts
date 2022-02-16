import * as utils from "~/lib/utils"
import * as core from "mrm-core"

export function gitignorePreset() {
  utils.title("Preset gitignore")

  /**
   * Init gitignore
   */
  utils.syncLines(".gitignore")
}

export default gitignorePreset
