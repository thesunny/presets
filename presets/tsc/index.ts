import * as utils from "~/lib/utils"
import { typescriptPreset } from "../typescript"

export default function tscPreset() {
  utils.title(`Preset TSC`)
  typescriptPreset()
  utils.copyLocalFiles(["tsconfig.tsc.json"])
  utils.addScripts({
    "-- tsc": "# Compile Typescript",
    "build:tsc":
      "rm -rf ./.dist && tsc -p tsconfig.tsc.json && echo 'Finished tsc build'",
  })
}
