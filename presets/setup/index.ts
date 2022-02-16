import * as utils from "~/lib/utils"
import * as core from "mrm-core"
import { starterPreset } from "../starter"

/**
 * This sets up the current project to use presets.
 *
 * The standard way of adding a script to a project is to us the `bin` property
 * on `package.json` but it doesn't work when you `yarn link` a project.
 *
 * We use a slightly convoluted method to setup presets (described in the
 * README.md file) so that we don't have to publish before testing each change
 * if we are using `yarn link`.
 */

export default function () {
  utils.title("Preset Setup")
  // starterPreset()
  utils.addScripts({
    "-- preset": "# Run preset from @thesunny/presets",
    preset:
      "ts-node --project node_modules/@thesunny/presets/tsconfig.ts-node.json node_modules/@thesunny/presets/bin/index.ts",
  })
}
