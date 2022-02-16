import * as utils from "~/lib/utils"

export function vercelPreset() {
  utils.title(`Preset Vercel`)
  utils.addDevDeps(["@thesunny/push-deploy", "set-vercel-env"])
  // utils.addDeps([])
  // utils.copyLocalFiles([])
  utils.addScripts({
    "-- vercel": "# Vercel deploy",
    "deploy:production": "push-deploy main production",
    "-- vercel env": "# Vercel env",
    "set-env:preview": "set-vercel-env .env/preview.env preview",
    "set-env:production": "set-vercel-env .env/production.env production",
  })
  utils.heading("Hints for setting up Vercel first time")
  console.log(`- \`git checkout -b production\`
- Create project on Portive
  - Build & Development Settings
    - build command: \`yarn build\`
    - install command: \`yarn install\`
  - Git
    - production branch: \`production\`
  - create \`.env/production.env\`
  - \`yarn set-env:production\`
`)
}

export default vercelPreset
