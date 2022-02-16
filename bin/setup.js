const { execSync, spawnSync } = require("child_process")

console.log("Installing Preset Minimum Dependencies")

// execSync("yarn add --dev typescript @types/node ts-node tsconfig-paths", {
//   encoding: "utf-8",
// })

spawnSync(
  "yarn",
  ["add", "--dev", "typescript", "@types/node", "ts-node", "tsconfig-paths"],
  {
    input: "",
    encoding: "utf-8",
    stdio: "inherit",
  }
)

console.log("Executing preset setup")

// execSync(
//   "yarn run ts-node --project node_modules/@thesunny/presets/tsconfig.ts-node.json node_modules/@thesunny/presets/bin/index.ts setup",
//   { encoding: "utf-8" }
// )

spawnSync(
  "yarn",
  [
    "run",
    "ts-node",
    "--project",
    "node_modules/@thesunny/presets/tsconfig.ts-node.json",
    "node_modules/@thesunny/presets/bin/index.ts",
    "setup",
  ],
  { stdio: ["pipe", "pipe", "pipe"] }
)

console.log(
  `Done installing preset script\n\nRecommend running "yarn preset starter" to get the basics`
)
