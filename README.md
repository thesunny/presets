# Presets

To get started with presets, do the following:

```sh
# If it's a new project...
yarn init
git init

# Updated most recent getting started only requires this.
# See the @thesunny/preset repository which automatically wires everything up.
yarn create @thesunny/preset

# Add dependencies and add script

# Add minimum dependencies
yarn add --dev typescript @types/node ts-node tsconfig-paths

# One of
yarn link @thesunny/presets

# Or later when we have this publicly
yarn add @thesunny/preset

# Runs a script that adds a `preset` script to `package.json`
node node_modules/@thesunny/presets/bin/setup.js

# (NOTE: See why we can't use `bin` in `package.json` below)
yarn run ts-node --project node_modules/@thesunny/presets/tsconfig.ts-node.json node_modules/@thesunny/presets/bin/index.ts setup

# All in one
git init && yarn add --dev typescript @types/node ts-node tsconfig-paths && yarn link @thesunny/presets && node node_modules/@thesunny/presets/bin/setup.js
```

## Why we can't use `bin` scripts

We use this presets package in many cases by using `yarn link`; however, `bin` doesn't work with `yarn link` which is a bug:

`yarn link <package> does not link bin executables #8719`
https://github.com/yarnpkg/yarn/issues/8719
