import * as utils from "~/lib/utils"

export function emotionPreset() {
  utils.title(`Preset emotion`)

  utils.addDeps({
    "@emotion/core": "^10.3.0",
    "@emotion/styled": "^10.3.0",
  })
}

export default emotionPreset
