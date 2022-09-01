/**
 * This is customized for Tailwind and is used only by tailwind at the moment
 *
 * If we add other configurations, we should probably comment the tailwind
 * code out and when we add other custom configurations, we can also comment
 * them out and the developer can comment them back in as needed.
 */

import "../styles/globals.css"
import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
