import * as utils from "~/lib/utils"

export function gitbookPreset() {
  utils.title(`Preset Gitbook`)
  utils.copyLocalFiles([
    ".gitbook.yaml",
    "docs/table-of-contents.md",
    "docs/introduction.md",
  ])
}

export default gitbookPreset
