import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { rgba } from "polished";

import Layout from "../Layout";
import { slugify } from "../utils/globals";
import { sgPageBanner } from "../utils/images";

const members: { name: string; role: string }[] = [
  {
    name: "nikoleye",
    role: "Project Lead, Writer",
  },
  {
    name: "samidare",
    role: "Developer",
  },
  {
    name: "Stinggyray",
    role: "Developer",
  },
  {
    name: "namtar",
    role: "Founder, Designer",
  },
  {
    name: "kawa",
    role: "Editor-in-Chief",
  },
  {
    name: "Thanik",
    role: "Writer, Editor",
  },
  {
    name: "iana",
    role: "Writer, Editor",
  },
  {
    name: "Kirahuang",
    role: "Host, Advisor",
  },
  {
    name: "Noël",
    role: "Founder, Advisor",
  },
  {
    name: "pepegaturtle",
    role: ":pepegaturtle:",
  },
];

interface Props {
  data: {
    allFile: {
      nodes: {
        name: string;
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      }[];
    };
  };
}

const About: React.VFC<Props> = ({ data }) => {
  const { nodes: imageNodes } = data.allFile;

  return (
    <Layout
      pageTitle="About"
      bannerImageUrl={sgPageBanner("about")}
      previousLocation="Home"
      previousLocationLink="/"
    >
      <main css={styles}>
        <h2>Sanity;Gone Team</h2>
        <ul className="team-members">
          {members.map(({ name, role }) => {
            const fileNode = imageNodes.find(
              (node) => node.name === slugify(name)
            );
            if (fileNode == null) {
              throw new Error(
                `Couldn't find avatar for ${name}, expected ${slugify(name)}`
              );
            }
            return (
              <li className="member-card" key={name}>
                <GatsbyImage
                  className="avatar"
                  image={fileNode.childImageSharp.gatsbyImageData}
                  alt=""
                />
                <span className="member-name">{name}</span>
                <span className="role">{role}</span>
              </li>
            );
          })}
        </ul>

        <section className="special-thanks">
          <h3>Special thanks to:</h3>
          <ul>
            <li>
              <b>cortz</b>, <b>Alyeska</b>, and <b>Dimbreath</b> for the help in
              early stages of development
            </li>
            <li>
              <b>Kengxxiao</b> for their{" "}
              <a
                className="emphasized-link"
                href="https://github.com/Kengxxiao/ArknightsGameData"
                target="_blank"
                rel="noreferrer noopener"
              >
                Arknights game data repository
              </a>
            </li>
            <li>
              <b>Jetroyz</b> for translations of not-yet-released operator
              skills and talents
            </li>
            <li>
              <b>Aceship</b> for Arknights assets and community support
            </li>
          </ul>
          <p></p>
        </section>
      </main>
    </Layout>
  );
};
export default About;

const styles = (theme: Theme) => css`
  padding: ${theme.spacing(0, 3)};

  h2 {
    margin: ${theme.spacing(4, 0, 0)};
    font-size: ${theme.typography.generalHeadingBold.fontSize}px;
    font-weight: ${theme.typography.generalHeadingBold.fontWeight};
    line-height: ${theme.typography.generalHeadingBold.lineHeight};
  }

  .team-members {
    margin: ${theme.spacing(4, 0, 0)};
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    list-style: none;
    gap: ${theme.spacing(3)};
    text-align: center;

    .member-card {
      padding: ${theme.spacing(4)};
      display: grid;
      grid-template-rows: repeat(3, max-content);
      justify-items: center;
      background-color: ${rgba(theme.palette.midtone.main, 0.66)};
      backdrop-filter: blur(${theme.spacing(1)});
      box-shadow: ${theme.spacing(0.25)} ${theme.spacing(0.5)}
        ${theme.spacing(1)} rgba(0, 0, 0, 0.15);
      border-radius: ${theme.spacing(1)};

      .avatar {
        width: 112px;
        height: 112px;
        border-radius: 50%;
      }

      .member-name {
        margin: ${theme.spacing(2, 0, 0)};
        font-size: ${theme.typography.generalHeadingBold.fontSize}px;
        font-weight: ${theme.typography.generalHeadingBold.fontWeight};
        line-height: ${theme.typography.generalHeadingBold.lineHeight};
      }

      .role {
        color: ${theme.palette.gray.main};
      }
    }
  }

  .special-thanks {
    h3 {
      margin: ${theme.spacing(3, 0, 0)};
    }

    p {
      margin: ${theme.spacing(2, 0, 0)};
    }
  }
`;

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativeDirectory: { eq: "member-avatars" }
      }
    ) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(width: 112, height: 112)
        }
      }
    }
  }
`;
