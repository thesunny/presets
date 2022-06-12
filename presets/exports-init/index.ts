import * as utils from "~/lib/utils"

export function gitignorePreset() {
  utils.title("Preset exports-init")

  /**
   * Copy configuration file for 'exports.json'
   */
  utils.copyLocalFiles(["exports.json"])
}

export default gitignorePreset
