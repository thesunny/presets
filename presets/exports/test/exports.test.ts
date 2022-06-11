import { createPackageExts, extendPackage } from ".."
import * as utils from "@thesunny/script-utils"

describe("map exports", () => {
  const mappings = {
    ".": "src/index.ts",
    api: "src/api/index.ts",
    client: "src/client/index.ts",
    mock: "src/mock/index.ts",
    web: "src/web/index.ts",
  }

  beforeAll(() => {
    const tempDir = "presets/exports/test/.temp"
    if (tempDir !== "presets/exports/test/.temp")
      throw new Error("Change it in two places so I don't do something stupid")
    utils.logger.silence(() => {
      utils.emptyDir(tempDir)
    })
  })

  afterAll(() => {
    const tempDir = "presets/exports/test/.temp"
    if (tempDir !== "presets/exports/test/.temp")
      throw new Error("Change it in two places so I don't do something stupid")
    utils.logger.silence(() => {
      utils.emptyDir(tempDir)
    })
  })

  it("should generate extensions", async () => {
    const packageExts = createPackageExts(mappings)
    expect(packageExts).toEqual({
      main: ".dist/cjs/src/index.js",
      module: ".dist/mjs/src/index.js",
      types: ".dist/cjs/src/index.d.ts",
      exports: {
        ".": {
          require: "./.dist/cjs/src/index.js",
          import: "./.dist/mjs/src/index.js",
          types: "./.dist/cjs/src/index.d.ts",
        },
        "./api": {
          require: "./.dist/cjs/src/api/index.js",
          import: "./.dist/mjs/src/api/index.js",
          types: "./.dist/cjs/src/api/index.d.ts",
        },
        "./client": {
          require: "./.dist/cjs/src/client/index.js",
          import: "./.dist/mjs/src/client/index.js",
          types: "./.dist/cjs/src/client/index.d.ts",
        },
        "./mock": {
          require: "./.dist/cjs/src/mock/index.js",
          import: "./.dist/mjs/src/mock/index.js",
          types: "./.dist/cjs/src/mock/index.d.ts",
        },
        "./web": {
          require: "./.dist/cjs/src/web/index.js",
          import: "./.dist/mjs/src/web/index.js",
          types: "./.dist/cjs/src/web/index.d.ts",
        },
      },
      typesVersions: {
        "*": {
          ".": ["./.dist/cjs/src/index.d.ts"],
          api: ["./.dist/cjs/src/api/index.d.ts"],
          client: ["./.dist/cjs/src/client/index.d.ts"],
          mock: ["./.dist/cjs/src/mock/index.d.ts"],
          web: ["./.dist/cjs/src/web/index.d.ts"],
        },
      },
    })
  })

  it("should generate extensions from files", async () => {
    const mappingsPath = "presets/exports/test/.temp/exports.json"
    const pkgPath = "presets/exports/test/.temp/pkg.json"
    const pkg = { name: "temporary", dependencies: {} }
    utils.logger.silence(() => {
      utils.removeFileIfExists(mappingsPath)
      utils.removeFileIfExists(pkgPath)
      utils.writeFile(mappingsPath, JSON.stringify(mappings, null, 2))
      utils.writeFile(pkgPath, JSON.stringify(pkg, null, 2))
    })
    extendPackage(pkgPath, mappingsPath)
    const pkgJson = JSON.parse(utils.readFile(pkgPath))
    expect(pkgJson).toEqual({
      name: "temporary",
      dependencies: {},
      main: ".dist/cjs/src/index.js",
      module: ".dist/mjs/src/index.js",
      types: ".dist/cjs/src/index.d.ts",
      exports: {
        ".": {
          require: "./.dist/cjs/src/index.js",
          import: "./.dist/mjs/src/index.js",
          types: "./.dist/cjs/src/index.d.ts",
        },
        "./api": {
          require: "./.dist/cjs/src/api/index.js",
          import: "./.dist/mjs/src/api/index.js",
          types: "./.dist/cjs/src/api/index.d.ts",
        },
        "./client": {
          require: "./.dist/cjs/src/client/index.js",
          import: "./.dist/mjs/src/client/index.js",
          types: "./.dist/cjs/src/client/index.d.ts",
        },
        "./mock": {
          require: "./.dist/cjs/src/mock/index.js",
          import: "./.dist/mjs/src/mock/index.js",
          types: "./.dist/cjs/src/mock/index.d.ts",
        },
        "./web": {
          require: "./.dist/cjs/src/web/index.js",
          import: "./.dist/mjs/src/web/index.js",
          types: "./.dist/cjs/src/web/index.d.ts",
        },
      },
      typesVersions: {
        "*": {
          ".": ["./.dist/cjs/src/index.d.ts"],
          api: ["./.dist/cjs/src/api/index.d.ts"],
          client: ["./.dist/cjs/src/client/index.d.ts"],
          mock: ["./.dist/cjs/src/mock/index.d.ts"],
          web: ["./.dist/cjs/src/web/index.d.ts"],
        },
      },
    })
  })
})
