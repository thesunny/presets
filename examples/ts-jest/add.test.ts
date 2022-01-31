import { add } from "./add"

describe("add two numbers", () => {
  it("should add two numbers", async () => {
    const answer = add(2, 3)
    expect(answer).toEqual(5)
  })
})
