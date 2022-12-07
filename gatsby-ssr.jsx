import * as React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="./src/assets/fonts/Inter-Regular.woff"
      as="font"
      type="font/woff"
      crossOrigin="anonymous"
      key="interFont"
    />,
  ])
}