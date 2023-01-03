import * as utils from "~/lib/utils"

export function tsNodePreset() {
  utils.title(`Preset tsnode`)
  utils.copyLocalFiles([
    "tsconfig.base.json",
    "tsconfig.custom.json",
    "tsconfig.ts-node.json",
  ])
  utils.addDevDeps(["typescript", "ts-node", "tsconfig-paths", "@types/node"])
  utils.addScripts({
    "-- ts-node": "# run with ts-node",
    ts: "ts-node --project tsconfig.ts-node.json",
  })
}

export default tsNodePreset()
