import { sortPackageJson, sortOrder } from "sort-package-json"
import { DefaultDeserializer } from "v8"
import sortObjectKeys from "sort-object-keys"

function listUniq(array: string[]) {
  return array.filter(function (item, pos) {
    return array.indexOf(item) == pos
  })
}

function listMoveToEnd(array: string[], src: string) {
  const nextArray = array.filter((key) => key !== src)
  nextArray.push(src)
  return nextArray
}

function moveAfter(array: string[], src: string, dest: string) {
  return listReorder(array, [dest, src])
}

function listReorder(array: string[], orderList: string[]) {
  /**
   * To prevent weird errors from happening, we ignore issues with duplicate
   * item values. If there are duplicate item values, we sort only the first
   * of the items. This should work for us fairly well when sorting scripts
   * by their script names as they shouldn't be duplicates.
   *
   * All our sorting is done by looking for the `indexOf` which is the first
   * found and so if there is a duplicate value, it should just get ignored.
   */
  array = listUniq(array)
  orderList = listUniq(orderList)
  /**
   * This is the last found value from the `orderList`
   */
  let insertionAfterIndex: null | number = null
  for (let orderIndex = 0; orderIndex < array.length; orderIndex++) {
    const orderItem = orderList[orderIndex]
    if (orderItem === undefined) continue
    const arrayIndex = array.indexOf(orderList[orderIndex])
    if (insertionAfterIndex === null) {
      insertionAfterIndex = arrayIndex
      continue
    }
    array.splice(arrayIndex, 1)
    if (arrayIndex < insertionAfterIndex) insertionAfterIndex--
    array.splice(insertionAfterIndex + 1, 0, orderItem)
    insertionAfterIndex++
  }
  return array
}

describe("sort package", () => {
  it("should short sortOrder", async () => {
    const list = ["a", "b", "c", "d", "e"]
    const nextList = listMoveToEnd(list, "c")
    expect(nextList).toEqual(["a", "b", "d", "e", "c"])
  })

  describe("moveAfter", () => {
    it("shouldn't do anything if src or dest aren't found", async () => {
      const list: string[] = ["a", "b", "c", "d", "e"]
      const nextList = moveAfter(list, "a", "z")
      expect(nextList).toEqual(["a", "b", "c", "d", "e"])
    })

    it("shouldn't do anything if src and dest are the same", async () => {
      const list: string[] = ["a", "b", "c", "d", "e"]
      const nextList = moveAfter(list, "c", "c")
      expect(nextList).toEqual(["a", "b", "c", "d", "e"])
    })

    it("should move src after dest", async () => {
      const list = ["a", "b", "c", "d", "e"]
      const nextList = moveAfter(list, "b", "d")
      console.log("nextList", nextList)
      expect(nextList).toEqual(["a", "c", "d", "b", "e"])
    })

    it("should move src after dest at end", async () => {
      const list = ["a", "b", "c", "d", "e"]
      const nextList = moveAfter(list, "b", "e")
      expect(nextList).toEqual(["a", "c", "d", "e", "b"])
    })

    it("should move src after dest at end", async () => {
      const list = ["a", "b", "c", "d", "e"]
      const nextList = moveAfter(list, "d", "b")
      expect(nextList).toEqual(["a", "b", "d", "c", "e"])
    })

    it("should move src after dest at same position", async () => {
      const list = ["a", "b", "c", "d", "e"]
      const nextList = moveAfter(list, "c", "b")
      expect(nextList).toEqual(["a", "b", "c", "d", "e"])
    })
  })

  describe("sort with list", () => {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"]

    it("should sort with a list", async () => {
      const list = listReorder(alphabet, ["b", "d", "f", "h"])
      expect(list).toEqual(["a", "b", "d", "f", "h", "c", "e", "g"])
      expect(alphabet).toEqual(["a", "b", "c", "d", "e", "f", "g", "h"])
    })

    it("should sort with a list", async () => {
      const list = listReorder(alphabet, ["b", "d", "f", "h"])
      expect(list).toEqual(["a", "b", "d", "f", "h", "c", "e", "g"])
    })

    it("should sort with a list and work backwards", async () => {
      const list = listReorder(alphabet, ["f", "e", "d", "c"])
      expect(list).toEqual(["a", "b", "f", "e", "d", "c", "g", "h"])
    })
  })
})
