import { graphql } from "gatsby"
import * as React from "react"
import Helmet from "react-helmet"

import Footer from "../components/Footer"
import SiteNav from "../components/header/SiteNav"
import PostCard from "../components/PostCard"
import Wrapper from "../components/Wrapper"
import IndexLayout from "../layouts"
import {
  inner,
  outer,
  PostFeed,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
} from "../styles/shared"
import { PageContext } from "../templates/post"

export interface IndexProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        lang: string
        description: string
        siteUrl: string
        facebook?: string
        twitter?: string
        googleSiteVerification: string
      }
    }
    logo: {
      childImageSharp: {
        fixed: any
      }
    }
    header: {
      childImageSharp: {
        fluid: any
      }
    }
    allMdx: {
      edges: {
        node: PageContext
      }[]
    }
  }
}

const IndexPage: React.FunctionComponent<IndexProps> = props => {
  const width = props.data.header.childImageSharp.fluid.sizes
    .split(", ")[1]
    .split("px")[0]
  const height = String(
    Number(width) / props.data.header.childImageSharp.fluid.aspectRatio
  )
  const config = props.data.site.siteMetadata

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.siteUrl} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${props.data.header.childImageSharp.fluid.src}`}
        />
        {config.facebook && (
          <meta property="article:publisher" content={config.facebook} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:url" content={config.siteUrl} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${props.data.header.childImageSharp.fluid.src}`}
        />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split("https://twitter.com/")[1]}`}
          />
        )}
        <meta property="og:image:width" content={width} />
        <meta property="og:image:height" content={height} />
      </Helmet>
      <Wrapper>
        <header css={[outer, SiteHeader]}>
          <SiteNav isHome={true} />
          <div css={inner}>
            <SiteHeaderContent>
              <SiteTitle>
                {props.data.logo ? (
                  <img
                    style={{ height: "180px", width: "180px" }}
                    src={props.data.logo.childImageSharp.fixed.src}
                    alt={config.title}
                  />
                ) : (
                  config.title
                )}
              </SiteTitle>
              <SiteDescription>{config.description}</SiteDescription>
            </SiteHeaderContent>
          </div>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed]}>
              {props.data.allMdx.edges.map(post => {
                // filter out drafts in production
                return (
                  (post.node.frontmatter.draft !== true ||
                    process.env.NODE_ENV !== "production") && (
                    <PostCard key={post.node.fields.slug} post={post.node} />
                  )
                )
              })}
            </div>
          </div>
        </main>
        {props.children}

        <Footer />
      </Wrapper>
    </IndexLayout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    logo: file(relativePath: { eq: "img/fyndx-logo.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    header: file(relativePath: { eq: "img/blog-cover.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
      limit: 1000
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
            draft
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(quality: 90) {
                      src
                    }
                  }
                }
              }
            }
          }
          excerpt
          fields {
            layout
            slug
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        lang
        description
        siteUrl
        facebook
        twitter
        googleSiteVerification
      }
    }
  }
`
