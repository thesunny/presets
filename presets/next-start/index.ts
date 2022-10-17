import * as utils from "~/lib/utils"
import stringHash from "string-hash"
import * as core from "mrm-core"

export default function nextStartPreset() {
  utils.title(`Preset next start for start:dev script`)

  /**
   * Add script if one doesn't exist for `next`
   */
  utils.heading("Add start:dev script")
  const pkg = core.packageJson()
  const startDevScript = pkg.getScript("start:dev")
  const pkgName = pkg.get("name")
  let port: number
  if (typeof pkgName === "string") {
    const hash = stringHash(pkgName)
    port = 3000 + (hash % 1000)
  } else {
    port = 3000
  }
  utils.task(`Add start:dev script for port ${port}`)
  utils.addScripts({
    "-- next": "# NextJs",
    "start:dev": `DOTENV=.env/dev.env next dev -p ${port}`,
    open: `open -a 'google chrome' http://localhost:${port}`,
  })
  utils.pass("Done")
}
