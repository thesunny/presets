import * as utils from "~/lib/utils"
import { default as tsNodePreset } from "../ts-node"

export default function tsnodeExamplePreset() {
  utils.title(`Preset ts-node-example`)
  tsNodePreset()
  utils.copyLocalFiles(["examples/ts-node/hello.ts"])
  utils.addScripts({
    "-- examples": "# examples",
    "ts-node-hello": "yarn ts-node examples/ts-node/hello",
  })
}
