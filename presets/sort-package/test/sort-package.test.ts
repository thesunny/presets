import { listMoveToEnd, listMoveAfter, listReorder } from ".."

describe("sort package", () => {
  describe("listMoveToEnd", () => {
    it("should move c to end", async () => {
      const list = ["a", "b", "c", "d", "e"]
      const nextList = listMoveToEnd(list, ["c"])
      expect(nextList).toEqual(["a", "b", "d", "e", "c"])
    })

    it("should move b, c to end", async () => {
      const list = ["a", "b", "c", "d", "e"]
      const nextList = listMoveToEnd(list, ["c", "b"])
      expect(nextList).toEqual(["a", "d", "e", "c", "b"])
    })

    it("should not move to end if not found", async () => {
      const list = ["a", "b", "c", "d", "e"]
      const nextList = listMoveToEnd(list, ["x", "y", "z"])
      expect(nextList).toEqual(["a", "b", "c", "d", "e"])
    })
  })

  describe("moveAfter", () => {
    it("shouldn't do anything if src or dest aren't found", async () => {
      const list: string[] = ["a", "b", "c", "d", "e"]
      const nextList = listMoveAfter(list, "a", "z")
      expect(nextList).toEqual(["a", "b", "c", "d", "e"])
    })

    it("shouldn't do anything if src and dest are the same", async () => {
      const list: string[] = ["a", "b", "c", "d", "e"]
      const nextList = listMoveAfter(list, "c", "c")
      expect(nextList).toEqual(["a", "b", "c", "d", "e"])
    })

    it("should move src after dest", async () => {
      const list = ["a", "b", "c", "d", "e"]
      const nextList = listMoveAfter(list, "b", "d")
      expect(nextList).toEqual(["a", "c", "d", "b", "e"])
    })

    it("should move src after dest at end", async () => {
      const list = ["a", "b", "c", "d", "e"]
      const nextList = listMoveAfter(list, "b", "e")
      expect(nextList).toEqual(["a", "c", "d", "e", "b"])
    })

    it("should move src after dest at end", async () => {
      const list = ["a", "b", "c", "d", "e"]
      const nextList = listMoveAfter(list, "d", "b")
      expect(nextList).toEqual(["a", "b", "d", "c", "e"])
    })

    it("should move src after dest at same position", async () => {
      const list = ["a", "b", "c", "d", "e"]
      const nextList = listMoveAfter(list, "c", "b")
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
