import * as utils from "~/lib/utils"

export function tailwindPreset() {
  utils.title(`Preset Tailwind`)

  /**
   * Add default `tailwind.config.js` and default global styles sheet.
   */
  utils.copyLocalFiles([
    "tailwind.config.js",
    "postcss.config.js",
    "styles/globals.css",
    "pages/_app.tsx",
  ])

  utils.addDevDeps({
    "@tailwindcss/aspect-ratio": "^0.4",
    "@tailwindcss/forms": "^0.5",
    "@tailwindcss/typography": "^0.5",
    autoprefixer: "^10.4",
    "prettier-plugin-tailwindcss": "^0.1",
    postcss: "^8.4",
    tailwindcss: "^3.1",
  })
}

export default tailwindPreset
