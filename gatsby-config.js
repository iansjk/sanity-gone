require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Sanity;Gone 0",
  },
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `9auzhr5vyq9m`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-image",
    "gatsby-transformer-json",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    "gatsby-plugin-react-helmet"
  ],
};
