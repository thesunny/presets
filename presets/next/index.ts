import * as utils from "~/lib/utils"
import { tsJestPreset } from "../ts-jest"
import stringHash from "string-hash"
import * as core from "mrm-core"

export default function nextPreset() {
  utils.title(`Preset next`)

  /**
   * Get ts-jest and all the typescript stuff set up
   */
  tsJestPreset()

  /**
   * Get the additional required `tsconfig` files for Next.js
   */
  utils.copyLocalFiles([
    "tsconfig.base.json",
    "tsconfig.custom.json",
    "tsconfig.json", // This is the Next.js tsconfig
    "next.config.js",
  ])

  /**
   * Add default page
   */
  utils.copyLocalFiles(["pages/index.tsx"], { exists: "skip" })

  /**
   * Add dependencies
   */
  utils.addDeps(["next", "react", "react-dom"])
  utils.addDevDeps(["@types/react", "@types/react-dom"])

  /**
   * Add script if one doesn't exist for `next`
   */
  utils.heading("Add start:dev script")
  const pkg = core.packageJson()
  const startDevScript = pkg.getScript("start:dev")
  if (startDevScript === undefined) {
    const pkgName = pkg.get("name")
    let port: number
    if (typeof pkgName === "string") {
      const hash = stringHash(pkgName)
      port = 3000 + (hash % 1000)
    } else {
      port = 3000
    }
    utils.addScripts({
      "-- next": "# NextJs",
      "start:dev": `DOTENV=.env/dev.env next start -p ${port}`,
    })
  } else {
    utils.task("Add start:dev script")
    utils.skip("Already exists")
  }
}
