import * as utils from "~/lib/utils"
import * as core from "mrm-core"

export default function () {
  utils.title("Preset gitignore")

  /**
   * Init gitignore
   */
  utils.syncLines(".gitignore")
}
