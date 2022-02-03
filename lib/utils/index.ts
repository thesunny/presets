export * from "@thesunny/script-utils"
import * as utils from "@thesunny/script-utils"
import { ExistsOptions } from "@thesunny/script-utils"

import Path from "path"
import { Dependencies, install } from "mrm-core"
import * as core from "mrm-core"

export function getPresetPath(subpath: string): string {
  return Path.join(__dirname, "../..", subpath)
}

export function addDeps(deps: string[] | Dependencies) {
  install(deps, { yarn: true, dev: false })
}

export function addDevDeps(deps: string[] | Dependencies) {
  install(deps, { yarn: true, dev: true })
}

export function addLines(path: string, lines: string[]) {
  utils.task(`Ensures lines in ${JSON.stringify(path)}`)
  core.lines(path).add(lines).save()
  utils.pass("Done")
}

export function syncLines(path: string) {
  const lines = utils.readFile(getPresetPath(path)).split("\n")
  addLines(path, lines)
}

export function addScripts(scripts: Record<string, string>) {
  let pkg = core.packageJson()
  utils.task("Add scripts to package.json")
  console.log(
    "  " + JSON.stringify({ scripts }, null, 2).split("\n").join("\n  ")
  )
  for (const [key, value] of Object.entries(scripts)) {
    pkg = pkg.setScript(key, value)
  }
  pkg.save()
  utils.pass("Done")
}

export function copyLocalFiles(
  paths: string[],
  { exists = "ask" }: { exists?: ExistsOptions } = { exists: "ask" }
) {
  for (const path of paths) {
    utils.task(`Ensure preset file ${JSON.stringify(path)}`)
    const localPath = getPresetPath(path)
    utils.copyFile(localPath, path, { exists })
  }
}
