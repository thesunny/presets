import * as utils from "@thesunny/script-utils"
import * as core from "mrm-core"

export default function () {
  utils.title("Preset Setup")
  utils.task("Add preset script")
  core
    .packageJson()
    .setScript("-- preset", "# Run preset from @thesunny/presets")
    .setScript(
      "preset",
      "ts-node --project node_modules/@thesunny/presets/tsconfig.ts-node.json node_modules/@thesunny/presets/bin/index.ts"
    )
    .save()
  utils.pass("Done")
}
