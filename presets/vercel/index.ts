import * as utils from "~/lib/utils"

export function vercelPreset() {
  utils.title(`Preset Vercel`)
  utils.addDevDeps(["@thesunny/push-deploy"])
  // utils.addDeps([])
  // utils.copyLocalFiles([])
  utils.addScripts({
    "-- vercel": "# Vercel deploy",
    "deploy:production": "push-deploy main production",
    "-- set vercel env": "# Vercel env",
    "set-vercel-env:dev": "set-vercel-env .env/dev.env preview",
    "set-vercel-env:production": "set-vercel-env .env/production.env prouction",
  })
}

export default vercelPreset
