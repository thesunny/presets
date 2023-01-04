export default function () {
  /**
   * For ESM modules to work with ts-jest, we need to create a list of
   * node_modules that are `esm` modules that jest needs to process. This is
   * because jest expects commonjs at the moment.
   *
   * Unfortunately, pnpm links all the files somewhere else and that somewhere
   * else makes it difficult for us to find what the esm modules are. When we
   * can figure this out, or ts-jest fixes the issue automatically, then we
   * might want to try pnpm again.
   */
  throw new Error(
    `Don't use pnpm yet. It doesn't play well with ts-jest and esm modules. See command near this error for more information.`
  )
}
