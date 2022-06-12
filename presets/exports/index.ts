import * as utils from "~/lib/utils"
import { PackageJson } from "type-fest"
import Path from "path"
import * as core from "mrm-core"

type PackageExport = {
  require: string
  import: string
  types: string
}

interface Config {
  exports: Record<string, string>
}

export function createPackageExts(config: Config) {
  utils.task("Check that .exports exists")
  if (typeof config.exports !== "object") {
    utils.fail(`Expected .exports to be an object but is ${config.exports}`)
  } else {
    utils.pass(`Exists`)
  }

  const map = config.exports
  const packageJson: Partial<PackageJson> = {}
  const packageExports: Record<string, PackageExport> = {}
  const typesVersionsStar: Record<string, [string]> = {}
  utils.task("Build exports for package.json")
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
  Object.assign(packageExports, {
    /**
     * This reference to `./package.json` has been removed.
     *
     * Note that this is present in the exports for `preact`; however, upon
     * removing it within `nexton`, the package seemed to publish and work
     * fine so I don't think it is necessary.
     */
    // "./package.json": "./package.json",
    /**
     * This reference to `./*` has been removed.
     *
     * I think what this does would be to allow importing directly to any
     * subpath which is something we don't want to do at this point. It's
     * possible we might want to add some form of wildcard in the future if
     * we plan to do a lot of exports.
     */
    // "./*": {
    //   require: "./.dist/cjs/src/*.js",
    //   import: "./.dist/mjs/src/*.js",
    //   types: "./.dist/cjs/src/*.d.ts",
    // },
  })
  packageJson.exports = packageExports
  packageJson.typesVersions = { "*": typesVersionsStar }
  utils.pass("Done")
  return packageJson
}

export function extendPackage(
  packagePath: string = "package.json",
  exportsPath: string = "exports.json"
) {
  utils.title("extend package.json with exports")
  utils.ensureFileExists(packagePath)
  utils.ensureFileExists(exportsPath)
  const exportsJson = JSON.parse(utils.readFile(exportsPath))
  const packageJson = core.json(packagePath)
  const packageExts = createPackageExts(exportsJson)
  for (const [key, value] of Object.entries(packageExts)) {
    packageJson.set(key, value)
  }
  utils.task(
    "Save package.json with exports, typesVersions, main, module and types"
  )
  packageJson.save()
  utils.pass("Done")
}

export default function () {
  utils.title("Preset exports")
  extendPackage()
}
