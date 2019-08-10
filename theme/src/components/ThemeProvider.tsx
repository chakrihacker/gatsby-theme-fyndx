import React, { useEffect, useState } from "react"
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming"
import { Global, css } from "@emotion/core"

import ThemeContext from "./ThemeContext"
import {
  useTheme,
  getTheme,
  CUBIC_BEZIER_TRANSITION,
  BACKGROUND_TRANSITION_TIME,
} from "../utils/theme"

const ThemeProvider = ({ children }) => {
  const [theme, toggleTheme] = useTheme()
  const currentTheme = getTheme(theme)
  const darkTheme = getTheme("dark")
  const { color } = currentTheme
  const [key, forceUpdate] = useState(0)
  useEffect(() => {
    // let react take care of dynamic styles
    forceUpdate(1)
    // after mounting, remove the class from body
    document.body.classList.remove("dark")
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <EmotionThemeProvider theme={currentTheme}>
        <Global
          styles={css({
            html: {
              scrollbarColor:
                theme === "dark"
                  ? `${darkTheme.muted} ${darkTheme.background}`
                  : "auto",
            },
            body: {
              // for rubber band effect in Chrome on MacOS
              // and outside the scaled div with background color
              backgroundColor: currentTheme.background,
              // add transition delay only after initial rendering
              // for continuing reading while maintaining
              // scroll position in dark mode on refresh
              transitionDelay:
                theme === "dark" && key === 1
                  ? BACKGROUND_TRANSITION_TIME
                  : "0s",
            },
            "body.dark": {
              ".container": {
                background: darkTheme.background,
                color: darkTheme.color,
              },
              ".muted": {
                color: darkTheme.muted,
              },
            },
          })}
        />
        <div
          css={{
            color,
            transition: CUBIC_BEZIER_TRANSITION,
            zIndex: 1,
            position: "relative",
            overflow: "hidden",
          }}
          className="container"
          key={key}
        >
          {children}
        </div>
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
