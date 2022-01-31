import * as utils from "@thesunny/script-utils"
import * as core from "mrm-core"

const LINES = [
  "node_modules/",
  ".DS_Store",
  ".dist/",
  ".env/",
  "yarn-error.log",
]

export default function () {
  utils.title("Preset gitignore")
  utils.task("Ensure lines in gitignore")
  console.log("  " + LINES.join("\n  "))
  core.lines(".gitignore").add(LINES).save()
  utils.pass("Done")
}
