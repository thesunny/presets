import * as utils from "~/lib/utils"

export function gitignorePreset() {
  utils.title("Preset gitignore")

  /**
   * Init gitignore
   */
  utils.syncLines(".gitignore")
}

export default gitignorePreset
