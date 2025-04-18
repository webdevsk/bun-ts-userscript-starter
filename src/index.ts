import { createLocationWatcher } from "../utils/location-change.event"
import { watchForSelectorsPromise } from "../utils/watch-for-selectors"
import APP_HTML from "./html/main-content.html"
import STYLES from "./scss/style.scss"

createLocationWatcher().run()
AM.addStyle(STYLES)

const ctrl = new AbortController()

window.addEventListener("spa:locationchange", async (event) => {
  if (event.detail.newUrl.href !== "/target/page") {
    ctrl.abort()
    return
  }

  await watchForSelectorsPromise(["#some-elm-that-appears-later"], { signal: ctrl.signal })

  console.log("#some-elm-that-appears-later is present")
  const emptyDiv = document.createElement("div")
  emptyDiv.insertAdjacentHTML("afterbegin", APP_HTML)
  document.querySelector("#some-elm-that-appears-later")!.appendChild(emptyDiv)

  ctrl.signal.addEventListener("abort", () => {
    // Run cleanup code here like removing DOM elements and aborting event listeners
    emptyDiv.parentElement?.removeChild(emptyDiv)
  })
})
