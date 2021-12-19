/* eslint-disable*/
const gatsbySlugify = require("@sindresorhus/slugify");
const { DateTime } = require("luxon");
require("dotenv").config();
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
});
const {
  professionToClass,
  subProfessionIdToSubclass,
} = require("./src/utils/globals.ts");

module.exports = {
  siteMetadata: {
    siteUrl: "https://sanitygone.help",
    siteName: "Sanity;Gone",
    image: "/sg-logo.png",
    description:
      "Sanity;Gone is a community resource for Arknights players, providing quick guides, reviews, and detailed information about the game.",
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
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-theme-material-ui",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-aceship",
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
          const latestOperatorAnalysis = allOperatorAnalysis
            .map((analysis) => DateTime.fromISO(analysis.updatedAt))
            .reduce((a, b) => (a > b ? a : b))
            .toISO();
          const pages = allPages.map((page) => {
            const { path } = page;
            const operatorAnalysis = allOperatorAnalysis.find(
              ({ operator: { name } }) =>
                `/operators/${gatsbySlugify(name)}/` === path
            );
            if (operatorAnalysis) {
              return {
                path,
                lastmod: operatorAnalysis.updatedAt,
              };
            } else if (path === "/" || path === "/operators/") {
              return {
                path,
                lastmod: latestOperatorAnalysis,
              };
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
        },
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "global",
        engine: "flexsearch",
        engineOptions: {
          tokenize: "full",
        },
        query: `
          {
            allOperatorsJson (
              filter: { isNotObtainable: { eq: false } }
            ) {
              nodes {
                name
                profession
                subProfessionId
                rarity
              }
            }
            allContentfulOperatorSubclass {
              nodes {
                subProfessionId
                class {
                  profession
                }
              }
            }
            allContentfulOperatorClass {
              nodes {
                profession
              }
            }
          }
        `,
        ref: "name",
        index: ["name"],
        // maps the data from the query into an array of results for indexing
        // this maps everything into the spec of a SearchResult object in SearchBar.tsx
        normalizer: ({ data }) => {
          const results = [];
          results.push(
            ...data.allOperatorsJson.nodes.map((node) => ({
              type: "operator",
              name: node.name,
              class: professionToClass(node.profession),
              subclass: subProfessionIdToSubclass(node.subProfessionId),
              rarity: node.rarity + 1,
            }))
          );
          results.push(
            ...data.allContentfulOperatorSubclass.nodes.map((node) => ({
              type: "subclass",
              name: subProfessionIdToSubclass(node.subProfessionId),
              class: professionToClass(node.class.profession),
              subProfession: node.subProfessionId,
            }))
          );
          results.push(
            ...data.allContentfulOperatorClass.nodes.map((node) => ({
              type: "class",
              name: professionToClass(node.profession),
              class: professionToClass(node.profession),
            }))
          );
          return results;
        },
      },
    },
  ],
};
