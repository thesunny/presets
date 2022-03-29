import * as utils from "~/lib/utils"
import { tsJestPreset } from "../ts-jest"
import stringHash from "string-hash"
import * as core from "mrm-core"
import tsnodePreset from "../ts-node"

export default function prismaPreset() {
  utils.title(`Preset Prisma`)

  /**
   * Get the lib files required for Prisma
   */
  utils.copyLocalFiles(["lib/prisma/index.ts"])

  /**
   * Add dependencies
   */
  utils.addDevDeps(["prisma"])
  utils.addDeps(["@prisma/client"])

  /**
   * Add script if one doesn't exist for `next`
   */
  utils.addScripts({
    "-- Prism": "# Prism",
    prisma: "dotenv -e .env/dev.env -- npx prisma",
  })
}
