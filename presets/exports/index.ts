import * as utils from "~/lib/utils"
import { PackageJson } from "type-fest"
import Path from "path"
import * as core from "mrm-core"

export default function () {
  utils.title("Hello World")
}

type PackageExport = {
  require: string
  import: string
  types: string
}

export function createPackageExts(map: Record<string, string>) {
  const packageJson: Partial<PackageJson> = {}
  const packageExports: Record<string, PackageExport> = {}
  const typesVersionsStar: Record<string, [string]> = {}
  for (let [key, path] of Object.entries(map)) {
    const pathInfo = Path.parse(path)
    if (key === ".") {
      Object.assign(packageJson, {
        main: `.dist/cjs/${pathInfo.dir}/${pathInfo.name}.js`,
        module: `.dist/mjs/${pathInfo.dir}/${pathInfo.name}.js`,
        types: `.dist/cjs/${pathInfo.dir}/${pathInfo.name}.d.ts`,
      })
    } else if (key.startsWith("."))
      throw new Error(
        `Except the root at "." Mapping keys should not start with a "." but is ${JSON.stringify(
          path
        )}`
      )

    /**
     * Generate Exports
     */
    const packageExport = {
      require: `./.dist/cjs/${pathInfo.dir}/${pathInfo.name}.js`,
      import: `./.dist/mjs/${pathInfo.dir}/${pathInfo.name}.js`,
      types: `./.dist/cjs/${pathInfo.dir}/${pathInfo.name}.d.ts`,
    }
    const packageKey = key === "." ? "." : `./${key}`
    packageExports[packageKey] = packageExport

    /**
     * Generate TypesVersions
     */

    typesVersionsStar[key] = [
      `./.dist/cjs/${pathInfo.dir}/${pathInfo.name}.d.ts`,
    ]
  }
  packageJson.exports = packageExports
  packageJson.typesVersions = { "*": typesVersionsStar }
  return packageJson
}

export function extendPackage(
  packagePath: string = "package.json",
  exportsPath: string = "exports.json"
) {
  if (!utils.fileExists(packagePath))
    throw new Error(
      `packagePath at ${JSON.stringify(packagePath)} could not be found`
    )
  const exportsJson = JSON.parse(utils.readFile(exportsPath))
  const packageJson = core.json(packagePath)
  const packageExts = createPackageExts(exportsJson)
  for (const [key, value] of Object.entries(packageExts)) {
    packageJson.set(key, value)
  }
  packageJson.save()
}
