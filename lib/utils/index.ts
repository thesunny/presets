export * from "@thesunny/script-utils"
import * as utils from "@thesunny/script-utils"
import Path from "path"
import { diffStringsUnified } from "jest-diff"
import promptSync from "prompt-sync"
import readlineSync from "readline-sync"
import { install } from "mrm-core"
import * as core from "mrm-core"

export function getPresetPath(subpath: string): string {
  return Path.join(__dirname, "../..", subpath)
}

export function addDeps(deps: string[]) {
  install(deps, { yarn: true, dev: false })
}

export function addDevDeps(deps: string[]) {
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

export function copyLocalFiles(paths: string[]) {
  const prompt = promptSync({ sigint: true })
  for (const path of paths) {
    utils.task(`Ensure preset file ${JSON.stringify(path)}`)
    const localPath = getPresetPath(path)
    if (utils.fileExists(path)) {
      const projectText = utils.readFile(path)
      const presetText = utils.readFile(localPath)
      if (projectText === presetText) {
        utils.pass("Done (file already exists and matches)")
      } else {
        const diff = diffStringsUnified(projectText, presetText)
        console.log(diff)
        console.log(`${JSON.stringify(path)} exists. Diff shown above.`)
        const answer = readlineSync.keyInYN(
          `Do you wish to replace ${JSON.stringify(path)}? [y/n/q]`
        )
        if (answer === true) {
          utils.removeFileIfExists(path)
          utils.copyFile(getPresetPath(path), path)
        } else if (answer === false) {
          utils.pass("Skipped")
        } else {
          utils.fail("User quit execution by not processing y or n")
        }
        console.log({ answer })
      }
    } else {
      utils.copyFile(getPresetPath(path), path)
    }
  }
}
