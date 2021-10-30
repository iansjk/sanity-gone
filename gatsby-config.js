/* eslint-disable*/
const gatsbySlugify = require("@sindresorhus/slugify");
const { DateTime } = require("luxon");
require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteUrl: "https://sanitygone.help",
    siteName: "Sanity;Gone",
    image: "/sg-logo.png",
    description: "Sanity;Gone is a community resource for Arknights players, providing quick guides, reviews, and detailed information about the game."
  },
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `9auzhr5vyq9m`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
            allContentfulOperatorAnalysis {
              nodes {
                updatedAt
                operator {
                  name
                }
              }
            }
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
        `,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allContentfulOperatorAnalysis: { nodes: allOperatorAnalysis },
        }) => {
          const latestOperatorAnalysis = allOperatorAnalysis.map((analysis) => DateTime.fromISO(analysis.updatedAt)).reduce((a, b) => a > b ? a : b).toISO();
          const pages = allPages.map((page) => {
            const { path } = page;
            const operatorAnalysis = allOperatorAnalysis.find(({ operator: { name } }) => `/operators/${gatsbySlugify(name)}/` === path);
            if (operatorAnalysis) {
              return {
                path,
                lastmod: operatorAnalysis.updatedAt,
              };
            } else if (path === "/" || path === "/operators/") {
              return {
                path,
                lastmod: latestOperatorAnalysis
              }
            }
            return { path };
          });
          return pages;
        },
        serialize: ({ path, lastmod }) => {
          return {
            url: path,
            lastmod,
          };
        }
      },
    },
  ],
};
