import * as utils from "~/lib/utils"
import { sortOrder } from "./sort-order"
import sortObjectKeys from "sort-object-keys"

function listUniq(array: string[]) {
  return array.filter(function (item, pos) {
    return array.indexOf(item) == pos
  })
}

export function listMoveToEnd(array: string[], orderKeys: string[]) {
  return listReorder(array, orderKeys, array.length)
}

export function listMoveAfter(array: string[], src: string, dest: string) {
  return listReorder(array, [dest, src])
}

/**
 * This method orders the list in a fairly unique way that fits with the needs
 * of sorting `scripts` in `package.json`.
 *
 * Namely, we've just added a bunch of scripts. Some of these scripts may
 * have already existed. And some have not. When we added these new scripts,
 * by default, they just get added to the bottom of the scripts which is not
 * what we want.
 *
 * Instead, we want to preserve their order as well as possible so the
 * algorithm we use is to look for the items in the `orderList` and as soon
 * as we find the first item, we insert the remaining items after that.
 *
 * Since these items will have already existed in the `array`, we are actually
 * moving them around in there.
 */
export function listReorder(
  list: string[],
  orderKeys: string[],
  insertionIndex: null | number = null
) {
  /**
   * To prevent weird errors from happening, we ignore issues with duplicate
   * item values. If there are duplicate item values, we sort only the first
   * of the items. This should work for us fairly well when sorting scripts
   * by their script names as they shouldn't be duplicates.
   *
   * All our sorting is done by looking for the `indexOf` which is the first
   * found and so if there is a duplicate value, it should just get ignored.
   */
  list = listUniq(list)
  orderKeys = listUniq(orderKeys)

  /**
   * Iterate through the order list which identifies the order that items
   * should be sorted in the array.
   */
  for (const orderItem of orderKeys) {
    /**
     * Find the `orderKey` in the `list`
     */
    const foundKeyIndex = list.indexOf(orderItem)

    /**
     * If nothing found, then go to the next `orderKey`
     */
    if (foundKeyIndex === -1) continue

    /**
     * If the `insertionIndex` is null, it means we haven't found the first
     * `orderKey` before. In this case, we set the `insertIndex` to the found
     * `orderKey` + 1 position because we want to insert after it.
     *
     * We then start the next iteration of the loop.
     */
    if (insertionIndex === null) {
      insertionIndex = foundKeyIndex + 1
      continue
    }
    /**
     * If the `insertionIndex` has previously been set, that means we start the
     * process to move the value to the position at the `foundKeyIndex`
     *
     * First, we remove the value from the array
     */
    list.splice(foundKeyIndex, 1)
    /**
     * When we remove the value from the array, the `insertionIndex` will shift
     * to the left if the `insertionIndex` is after the `foundKeyIndex`.
     *
     * We make this adjustment here.
     */
    if (insertionIndex > foundKeyIndex) insertionIndex--
    /**
     * Insert at the insertion point
     */
    list.splice(insertionIndex, 0, orderItem)
    /**
     * After inserting, we know our next insertion point is going to be one
     * to the right.
     */
    insertionIndex++
  }
  return list
}

export default function sortPackagePreset() {
  utils.title("Preset sort-package")

  const pkg = JSON.parse(utils.readFile("package.json"))

  const sortedPkg = sortObjectKeys(pkg, sortOrder)
  /**
   * NOTE: Tried using `json-stringify-pretty-compact` but it can compact
   * the dependencies object which is terrible.
   */
  const text = JSON.stringify(sortedPkg, null, 2)
  utils.removeFileIfExists("package.json")
  utils.writeFile("package.json", text)
}
