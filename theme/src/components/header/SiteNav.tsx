// tslint:disable:no-http-string
import { Link, StaticQuery, graphql } from "gatsby"
import * as React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { FiTerminal, FiSun, FiMoon } from "react-icons/fi"

import ThemeContext from "../ThemeContext"
import { SocialLink } from "../../styles/shared"
import Facebook from "../icons/facebook"
import Twitter from "../icons/twitter"
import SubscribeModal from "../subscribe/SubscribeOverlay"
import SiteNavLogo from "./SiteNavLogo"
import {
  BACKGROUND_TRANSITION_TIME,
  EASE_IN_OUT_TRANSITION,
  getTheme,
} from "../../utils/theme"
import Button from "../Button"

const SiteNavStyles = css`
  position: initial;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow-y: hidden;
  height: 50px;
  font-size: 1.5rem;
`

const SiteNavLeft = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-right: 10px;
  // padding-bottom: 80px;
  letter-spacing: 0.4px;
  white-space: nowrap;

  -ms-overflow-scrolling: touch;

  @media (max-width: 700px) {
    margin-right: 0;
    // padding-left: 4vw;
  }
`

const NavStyles = css`
  display: flex;
  margin: 0 0 0 -12px;
  padding: 0;
  list-style: none;

  li {
    display: block;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }

  li a {
    display: block;
    margin: 0;
    padding: 10px 12px;
    color: #fff;
    opacity: 0.8;
  }

  li a:hover {
    text-decoration: none;
    opacity: 1;
  }
`

const SiteNavRight = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 40px;

  @media (max-width: 700px) {
    display: none;
  }
`

const SocialLinks = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  a:last-of-type {
    padding-right: 20px;
  }
`

const SubscribeButton = styled.a`
  display: block;
  padding: 4px 10px;
  border: #fff 1px solid;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1em;
  border-radius: 10px;
  opacity: 0.8;

  :hover {
    text-decoration: none;
    opacity: 1;
    cursor: pointer;
  }
`

interface SiteNavData {
  site: {
    siteMetadata: {
      title: string
      facebook?: string
      twitter?: string
      showSubscribe: boolean
    }
  }
}

const SiteNav: React.FC<{}> = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext)
  const { color, background, secondary } = getTheme(theme)
  const darkTheme = getTheme("dark")
  const subscribe = React.createRef<SubscribeModal>()

  const openModal = () => {
    if (subscribe.current) {
      subscribe.current.open()
    }
  }

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              facebook
              twitter
              footer
            }
          }
        }
      `}
      // tslint:disable-next-line:react-this-binding-issue
      render={(props: SiteNavData) => {
        const config = props.site.siteMetadata
        return (
          <nav css={[SiteNavStyles]}>
            <SiteNavLeft>
              <SiteNavLogo />
              <ul css={NavStyles} role="menu">
                {/* TODO: mark current nav item - add class nav-current */}
                <li role="menuitem">
                  <Link to="/">Home</Link>
                </li>
                <li role="menuitem">
                  <Link to="/about">About</Link>
                </li>
                <li role="menuitem">
                  <Link to="/tags/getting-started/">Getting Started</Link>
                </li>
              </ul>
            </SiteNavLeft>
            <SiteNavRight>
              <SocialLinks>
                {config.facebook && (
                  <a
                    css={SocialLink}
                    href={config.facebook}
                    target="_blank"
                    title="Facebook"
                    rel="noopener noreferrer"
                  >
                    <Facebook />
                  </a>
                )}
                {config.twitter && (
                  <a
                    css={SocialLink}
                    href={config.twitter}
                    title="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter />
                  </a>
                )}
              </SocialLinks>
              {config.showSubscribe && (
                <SubscribeButton onClick={openModal}>Subscribe</SubscribeButton>
              )}
              {config.showSubscribe && <SubscribeModal ref={subscribe} />}
              <Button
                circular
                onClick={toggleTheme}
                css={{
                  background,
                  transitionDuration: "0s",
                  // delay background-color transition for nicer animation
                  transitionDelay:
                    theme === "dark" ? "0s" : BACKGROUND_TRANSITION_TIME,
                  transitionProperty: "background-color, color",
                }}
              >
                {theme === "light" ? <FiSun /> : <FiMoon />}
                <div
                  className={theme}
                  css={{
                    position: "absolute",
                    background: darkTheme.background,
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    zIndex: -1,
                    transition: `transform ${BACKGROUND_TRANSITION_TIME} ease`,
                    "&.dark": {
                      transform: "scale(150)",
                    },
                  }}
                />
              </Button>
            </SiteNavRight>
          </nav>
        )
      }}
    />
  )
}

export default SiteNav
