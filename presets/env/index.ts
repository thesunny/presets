import * as utils from "~/lib/utils"

export default function envPreset() {
  utils.title(`Preset env`)

  /**
   * Get the additional required `tsconfig` files for Next.js
   */
  utils.copyLocalFiles([".env/dev.env", ".env/production.env"])
}
