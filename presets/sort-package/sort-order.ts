/**
 * This sort order is a customized version of:
 *
 * [sort-package-json](https://github.com/keithamus/sort-package-json)
 *
 * NOTE: Any changes made to the original sort order are commented for clarity.
 */
export const sortOrder = [
  "$schema",
  "name",
  "displayName",
  "version",
  "private",
  "description",
  "categories",
  "keywords",
  "homepage",
  "bugs",
  "repository",
  "funding",
  "license",
  "qna",
  "author",
  "maintainers",
  "contributors",
  "publisher",
  "sideEffects",
  "type",
  "directories", // moved below "type" because we want to know what files/directories are included
  "files", // moved
  "main",
  "svelte",
  "umd:main",
  "jsdelivr",
  "unpkg",
  "module",
  "source",
  "jsnext:main",
  "browser",
  "react-native",
  "types",
  /**
   * All the multiple entry points are below the primary entry points
   */
  "imports", // moved above `typesVersions`
  "exports", // moved above `typesVersions`
  "typesVersions",
  "typings",
  "style",
  "example",
  "examplestyle",
  "assets",
  "bin",
  "man",
  "workspaces",
  "binary",
  "betterScripts",
  "contributes",
  "activationEvents",
  "husky",
  "simple-git-hooks",
  "pre-commit",
  "commitlint",
  "lint-staged",
  "config",
  "nodemonConfig",
  "browserify",
  "babel",
  "browserslist",
  "xo",
  "prettier",
  "eslintConfig",
  "eslintIgnore",
  "npmpkgjsonlint",
  "npmPackageJsonLintConfig",
  "npmpackagejsonlint",
  "release",
  "remarkConfig",
  "stylelint",
  "ava",
  "jest",
  "mocha",
  "nyc",
  "c8",
  "tap",
  "resolutions",
  "devDependencies",
  "dependenciesMeta",
  "peerDependencies",
  "peerDependenciesMeta",
  "optionalDependencies",
  "bundledDependencies",
  "bundleDependencies",
  "dependencies", // moved dependencies to the bottom for strong visibility
  "extensionPack",
  "extensionDependencies",
  "flat",
  "packageManager",
  "engines",
  "engineStrict",
  "volta",
  "languageName",
  "os",
  "cpu",
  "preferGlobal",
  "publishConfig",
  "icon",
  "badges",
  "galleryBanner",
  "preview",
  "markdown",
  "scripts", // moved to the bottom for quick access (we are here the most)
]
