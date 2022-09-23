# Exports

WARNING: This preset may not be in a valid working state. We can probably refer to `nexton` as an example where we have a working implementation of multiple entry points.

Some things to consider:

- Using something like `microbundle` to help us create entry points
- Get the unit test working which requires us to figure out
  - Do we include `package.json`
  - Do we include the subpackages `package.json` files
  - When and how do we use the wildcards, especially in reference to subpackage files that may not be bundled into a single file or do we force everything to bundle into a single file.

---

The exports preset modifies `package.json` so that we can access portions of the NPM library using a path. This works like packages like Next.js where we import the `Link` component by using an import like:

```typescript
import Link from "next/link"
```

- [Exports](#exports)
  - [Tree Shaking Isn't Enough](#tree-shaking-isnt-enough)
  - [Preamble](#preamble)
  - [Design Decisions](#design-decisions)

## Tree Shaking Isn't Enough

Having multiple entry points should be solved if tree shaking works perfectly; however, one area where it doesn't work the way we expect is with Next.js.

This happens when we import a package into a Next.js `pages` file. The imports that are used with `getServerSideProps` are only loaded on the server. We don't want them to be loaded on the browser.

If we don't split the imported library with subpaths, sometimes things that are meant for the server get loaded into the browser. This ends up causing issues when the code expects to be in a Node.js environment but is in a browser environment.

Here's an error when we import like this:

```typescript
// this works
import Web from "nexton/web"

// but this fails
import { Web } from "nexton"
```

The error looks like this:

```text
./node_modules/mime/mime.js:2:0
Module not found: Can't resolve 'fs'
null
```

And happens because we are loading all of `nexton` which somewhere inside includes `fs`. It's possible that with tree-shaking this gets compiled out when making a production build, but that knowledge doesn't help us while we are developing.

## Preamble

There are many ways to accomplish this and there does not appear to be a standard or recommended way. Popular libraries like `preact`, `lodash` and `next` using different methods.

Some variations are:

- Include a `.js` and `.d.ts` file in the root directory and have it export the actual file from the dist directory. [Next.js](https://github.com/vercel/next.js/tree/canary/packages/next) which includes types and [Lodash](https://github.com/lodash/lodash) which does not
- Include `exports` on `package.json` that point to files in the dist directory [Preact](https://github.com/preactjs/preact)
- Use `exports` for code
- Use `typesVersions` for types
- Use `exports.*.types` for types
- Use `typesVersions` and `exports.*.types` for types.
- Include `package.json` in folders from the root but I'm not sure what the benefit of this is. [Preact](https://github.com/preactjs/preact)
- Within the packages, sometimes they are specified with `internal: true` and I don't know why

WARNING: There is an extensive and legitimate looking blog post somewhere that describes how to get multiple entries working with TypeScript that DOES NOT WORK. It uses `typesVersions` only which likely works in specific versions of Node/TypeScript but doesn't work in my environment. I found this out because mine didn't work with extensive retrying, but also eventually finding another user on the Internet describing the same thing.

## Design Decisions

Our design decisions are as follows but they may change.

- We use the `exports` property in `package.json` for these reasons:
  - It forces us to be explicit about what is the public interface. Having some `.js` files in the root, some of which could be for configuration, is imprecised.
  - It allows us to specify multiple entry points depending on the target. For example, we can support commonjs, module and type exports.
  - It allows us to specify modern/older browsers in the future if we want.
  - TypeScript 4.7 supports `exports.*.types` for types but earlier versions don't https://github.com/microsoft/TypeScript/issues/33079
- We use a mapping file named `exports.json` in the root directory. This is because specify the `exports` manually is prone to error. In fact, I would say it is more likely to result in errors than not over time and those errors are hard to see.
- We use `typesVersions` which works in older versions of TypeScript before 4.7 https://github.com/microsoft/TypeScript/issues/33079

Problems:

- `package.json` gets bloated. We solve this by making sure that the dependencies and `scripts` appear at the bottom, the part which we are mainly looking at. We want `exports` and `typesVersions` in the middle where they are harder to navigate to (i.e. not top and not bottom of page)
- Error prone. This is why we use `exports.json` along with this `yarn preset exports` to modify the `package.json`
- WTF is this `exports.json`. For people that haven't seen it before, the `exports.json` file describes how it is being used so people can find out what it is.
