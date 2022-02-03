const { spawnSync } = require("child_process")

console.log("Installing Preset Minimum Dependencies")

spawnSync(
  "yarn",
  ["add", "--dev", "typescript", "@types/node", "ts-node", "tsconfig-paths"],
  {
    input: "",
    encoding: "utf-8",
    stdio: "inherit",
  }
)

spawnSync("yarn", [
  "run",
  "ts-node",
  "--project",
  "node_modules/@thesunny/presets/tsconfig.ts-node.json",
  "node_modules/@thesunny/presets/bin/index.ts",
  "setup",
])
