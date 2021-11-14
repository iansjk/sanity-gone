/* eslint-disable*/
const gatsbySlugify = require("@sindresorhus/slugify");
const { DateTime } = require("luxon");
require("dotenv").config();

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
        path: `./src/data/`,
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
              subclass: subProfessionToSubclass(node.subProfessionId),
              rarity: node.rarity + 1,
            }))
          );
          results.push(
            ...data.allContentfulOperatorSubclass.nodes.map((node) => ({
              type: "subclass",
              name: subProfessionToSubclass(node.subProfessionId),
              class: professionToClass(node.class.profession),
              subProfession: node.subProfessionId,
            }))
          );
          results.push(
            ...data.allContentfulOperatorClass.nodes.map((node) => ({
              type: "class",
              name: professionToClass(node.profession),
              class: professionToClass(node.profession),
              subProfession: node.subProfessionId,
            }))
          );
          return results;
        },
      },
    },
  ],
};

/*
 * This is actually a nightmare and the worst thing ever, but it's a temporary
 * solution while we figure out ES6 and CJS...
 */
function toTitleCase(string) {
  return [...string.toLowerCase()]
    .map((char, i) => (i === 0 ? char.toUpperCase() : char))
    .join("");
}

function professionToClass(profession) {
  switch (profession) {
    case "PIONEER":
      return "Vanguard";
    case "WARRIOR":
      return "Guard";
    case "SPECIAL":
      return "Specialist";
    case "TANK":
      return "Defender";
    case "SUPPORT":
      return "Supporter";
    default:
      return toTitleCase(profession);
  }
}

const subProfessionLookup = {
  pioneer: "Pioneer",
  charger: "Spearhead",
  tactician: "Tactician",
  bearer: "Flagbearer",
  centurion: "Assault",
  fighter: "Brawler",
  artsfghter: "Spellblade",
  instructor: "Instructor",
  lord: "Warlord",
  sword: "Swordmaster",
  musha: "Musha",
  fearless: "Fearless",
  reaper: "Reaper",
  librator: "Liberator",
  protector: "Ironguard",
  guardian: "Guardian",
  unyield: "Unyielding",
  artsprotector: "Arts Ironguard",
  duelist: "Champion",
  fastshot: "Rapid Fire",
  closerange: "Heavy",
  aoesniper: "Cannoneer",
  longrange: "Marksman",
  reaperrange: "Spreadshot",
  siegesniper: "Siege",
  bombarder: "Bombardier",
  corecaster: "Core",
  splashcaster: "Dispersal",
  funnel: "Magitech",
  phalanx: "Formation",
  mystic: "Mystic",
  chain: "Chain",
  blastcaster: "Barrage",
  physician: "Healer",
  ringhealer: "Mass Healer",
  healer: "Mender",
  slower: "Inhibitor",
  underminer: "Weakener",
  bard: "Bard",
  blessing: "Protector",
  summoner: "Summoner",
  executor: "Executioner",
  pusher: "Pusher",
  stalker: "Stalker",
  hookmaster: "Grappler",
  geek: "Geek",
  merchant: "Merchant",
  traper: "Trapper",
  dollkeeper: "Puppeteer",
};

function subProfessionToSubclass(string) {
  return subProfessionLookup[string];
}
