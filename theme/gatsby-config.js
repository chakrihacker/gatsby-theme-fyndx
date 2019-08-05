/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const mkdirp = require("mkdirp")
const fs = require("fs")

exports.onPreBootstrap = ({ store, reporter }) => {
  const { program } = store.getState()

  const dirs = [path.join(program.directory, "content")]

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`)
      mkdirp.sync(dir)
    }
  })
}

module.exports = {
  siteMetadata: {
    title: "FyndX",
    description: "Fynd best articles for JavaScript developers",
    coverImage: "img/blog-cover.jpg",
    logo: "img/ghost-logo.png",
    lang: "en",
    siteUrl: "https://fyndx.io", // full path to blog - no ending slash
    facebook: "https://www.facebook.com/ghost",
    twitter: "https://twitter.com/tryghost",
    showSubscribe: false, // subscribe button in site nav and home page
    mailchimpAction: "", // 'https://twitter.us19.list-manage.com/subscribe/post?u=a89b6987ac248c81b0b7f3a0f&amp;id=7d777b7d75',
    mailchimpName: "", // 'b_a89b6987ac248c81b0b7f3a0f_7d777b7d75',
    mailchimpEmailFieldName: "", // 'MERGE0',
    googleSiteVerification: "", // 'GoogleCode',
    footer: "is based on Gatsby Casper",
    postsPerPage: 6,
  },
  mapping: {
    "Mdx.frontmatter.author": "AuthorYaml",
  },
  plugins: [
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: path.join(process.cwd(), "content"),
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1rem",
            },
          },
          { resolve: "gatsby-remark-prismjs" },
          { resolve: "gatsby-remark-copy-linked-files" },
          { resolve: "gatsby-remark-smartypants" },
          { resolve: "gatsby-remark-abbr" },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1170,
              quality: 90,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.join(__dirname, `src/pages`),
      },
    },
    "gatsby-transformer-json",
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: "https://fyndx.io",
      },
    },
    "gatsby-plugin-emotion",
    "gatsby-plugin-typescript",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-yaml",
    "gatsby-plugin-feed",
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require("postcss-color-function"),
          require("cssnano")(),
        ],
      },
    },
  ],
}
