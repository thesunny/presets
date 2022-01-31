import * as utils from "~/lib/utils"
import * as core from "mrm-core"

export default function starter() {
  utils.title(`Preset prettierrc`)
  utils.copyLocalFiles([".prettierrc"])
}
