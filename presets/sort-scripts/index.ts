import sortObjectKeys from "sort-object-keys"
import * as utils from "~/lib/utils"

/**
 * Takes a flat array of all script keys and groups them into an Object like:
 *
 * {
 *   '-- group1': ['script-1', 'script-2'],
 *   '-- group2': ['script-3', 'script-4']
 * }
 */
function groupScriptKeys(scriptKeys: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = { "": [] }
  let lastParentKey: string = ""
  for (const key of scriptKeys) {
    if (key.startsWith("--")) {
      groups[key] = []
      lastParentKey = key
    } else {
      groups[lastParentKey].push(key)
    }
  }
  return groups
}

function sortScriptsPreset() {
  utils.title("Preset sort-scripts")

  const pkg = JSON.parse(utils.readFile("package.json"))

  const { scripts } = pkg

  const allScriptKeys = Object.keys(scripts)

  /**
   * Takes a flat array of all script keys and groups them into an Object like:
   *
   * {
   *   '-- group1': ['script-1', 'script-2'],
   *   '-- group2': ['script-3', 'script-4']
   * }
   */
  const groups = groupScriptKeys(allScriptKeys)

  /**
   * sort the groups alphabetically
   */
  const sortedGroups = sortObjectKeys(groups)

  /**
   * Move the preset script to the end because it has nothing to do with the
   * main scripts. It's just so that we can run these preset commands.
   *
   * NOTE:
   *
   * '-- end' will come at the very end but is done separately because '-- end'
   * needs to be alone at the end where as `-- preset` should carry its
   * children with it.
   */
  const preset = sortedGroups["-- preset"]
  delete sortedGroups["-- preset"]
  sortedGroups["-- preset"] = preset

  /**
   * Flattens the groups into a `Array<string>`
   */
  const allOrderedKeys: string[] = []
  for (const parentKey in sortedGroups) {
    const children = sortedGroups[parentKey]
    if (parentKey.length === 0) {
      allOrderedKeys.push(...children.sort())
    } else {
      allOrderedKeys.push(parentKey, ...children.sort())
    }
  }

  /**
   * Now sort the original `scripts` object.
   */
  const nextScripts = sortObjectKeys(scripts, allOrderedKeys)

  /**
   * Make sure `-- end` is always last. This is there to make it easier to add
   * new scripts. We never have to worry about whether or not tehre is a
   * trailing comma.
   */

  delete nextScripts["-- end"]
  nextScripts["-- end"] = "# end"

  /**
   * And incorporate it back into the full `package.json`
   */
  pkg.scripts = nextScripts

  /**
   * The basic JSON.stringify works better than trying to compact it smartly
   * which can product undesirable results.
   */
  const text = JSON.stringify(pkg, null, 2)

  utils.removeFileIfExists("package.json")
  utils.writeFile("package.json", text)
}

export { sortScriptsPreset }
export default sortScriptsPreset
