import * as utils from "~/lib/utils"
import { tsJestPreset } from "../ts-jest"
import stringHash from "string-hash"
import * as core from "mrm-core"
import tsnodePreset from "../ts-node"

export default function knexPreset() {
  utils.title(`Preset Knex`)

  /**
   * Get ts-jest and all the typescript stuff set up
   */
  tsnodePreset()

  /**
   * Get the additional required `tsconfig` files for Next.js
   */
  utils.copyLocalFiles([
    "knexfile.ts",
    "knex/migration.stub",
    "knex/migration-utils.ts",
  ])

  /**
   * Add dependencies
   */
  utils.addDeps(["dotenv", "knex", "pg"])

  /**
   * Add script if one doesn't exist for `next`
   */
  utils.addScripts({
    "-- Knex": "# Knex migrations",
    knex: "ENV=.env/dev.env ts-node --project tsconfig.ts-node.json ./node_modules/.bin/knex",
    "migrate:make": "yarn knex migrate:make",
    "migrate:up": "yarn knex migrate:up",
    "migrate:down": "yarn knex migrate:down",
    "migrate:latest": "yarn knex migrate:latest",
    "migrate:rollback": "yarn knex migrate:rollback",
    "migrate:list": "yarn knex migrate:list",
    "migrate:zero": "yarn knex migrate:rollback --all",
    remigrate: "npm-run-all -s migrate:zero migrate:latest",
    seed: "yarn knex seed:run",
  })
  // utils.heading("Add start:dev script")
  // const pkg = core.packageJson()
  // const startDevScript = pkg.getScript("start:dev")
  // if (startDevScript === undefined) {
  //   const pkgName = pkg.get("name")
  //   let port: number
  //   if (typeof pkgName === "string") {
  //     const hash = stringHash(pkgName)
  //     port = 3000 + (hash % 1000)
  //   } else {
  //     port = 3000
  //   }
  //   utils.task(`Add start:dev script for port ${port}`)
  //   utils.addScripts({
  //     "-- next": "# NextJs",
  //     "start:dev": `DOTENV=.env/dev.env next dev -p ${port}`,
  //   })
  //   utils.pass("Done")
  // } else {
  //   utils.task("Add start:dev script")
  //   utils.skip("Already exists")
  // }
}
