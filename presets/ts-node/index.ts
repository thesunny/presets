import * as utils from "~/lib/utils"
import * as core from "mrm-core"

export default function tsnodePreset() {
  utils.title(`Preset tsnode`)
  utils.copyLocalFiles(["tsconfig.base.json", "tsconfig.ts-node.json"])
  utils.addDevDeps(["typescript", "ts-node", "tsconfig-paths", "@types/node"])
  utils.addScripts({
    "-- ts-node": "# run with ts-node",
    "ts-node": "ts-node --project tsconfig.ts-node.json",
  })
}
