/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: ["gatsby-theme-fyndx"],
  // setup your siteMetadata, further described below
  siteMetadata: {
    title: "FyndX",
    description: "Fynd best articles for JavaScript developers",
    coverImage: "img/blog-cover.jpg",
    logo: "img/ghost-logo.png",
    lang: "en",
    siteUrl: "https://gatsby-casper.netlify.com",
    facebook: "https://www.facebook.com/ghost",
    twitter: "https://twitter.com/tryghost",
    showSubscribe: false,
    mailchimpAction:
      "https://twitter.us19.list-manage.com/subscribe/post?u=a89b6987ac248c81b0b7f3a0f&amp;id=7d777b7d75",
    mailchimpName: "b_a89b6987ac248c81b0b7f3a0f_7d777b7d75",
    mailchimpEmailFieldName: "MERGE0",
    googleSiteVerification: "GoogleCode",
  },
}
