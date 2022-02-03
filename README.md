# Presets

To get started with presets, do the following:

```sh
# If it's a new project...
yarn init
git init

# Add dependencies and add script
node node_modules/@thesunny/presets/bin/setup.js

# Add minimum dependencies
yarn add --dev typescript @types/node ts-node tsconfig-paths

# Runs a script that adds a `preset` script to `package.json`
# (NOTE: See why we can't use `bin` in `package.json` below)
yarn run ts-node --project node_modules/@thesunny/presets/tsconfig.ts-node.json node_modules/@thesunny/presets/bin/index.ts setup
```

## Why we can't use `bin` scripts

We use this presets package in many cases by using `yarn link`; however, `bin` doesn't work with `yarn link` which is a bug:

`yarn link <package> does not link bin executables #8719`
https://github.com/yarnpkg/yarn/issues/8719
