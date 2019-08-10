import { graphql, Link, StaticQuery } from "gatsby"
import * as React from "react"
import { css } from "@emotion/core"

const SiteNavLogoStyles = css`
  flex-shrink: 0;
  display: block;
  margin-right: 24px;
  color: #fff;
  font-size: 1.7rem;
  line-height: 1em;
  font-weight: bold;
  letter-spacing: -0.5px;

  :hover {
    text-decoration: none;
  }

  img {
    display: block;
    width: auto;
    height: 50px;
  }
`

interface SiteNavLogoProps {
  logo?: {
    childImageSharp: {
      fixed: any
    }
  }
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const SiteNavLogo = () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        logo: file(relativePath: { eq: "img/fyndx-logo.png" }) {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    // tslint:disable-next-line:react-this-binding-issue
    render={(data: SiteNavLogoProps) => (
      <Link className="site-nav-logo" css={SiteNavLogoStyles} to="/">
        {data.logo ? (
          <img
            src={data.logo.childImageSharp.fixed.src}
            alt={data.site.siteMetadata.title}
          />
        ) : (
          data.site.siteMetadata.title
        )}
      </Link>
    )}
  />
)

export default SiteNavLogo
