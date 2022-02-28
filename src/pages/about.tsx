import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import { rgba } from "polished";
import Image from "next/image";

import Layout from "../Layout";
import { sgPageBanner } from "../utils/images";

import type { NextPage } from "next";

const members: { name: string; role: string; imageFilename: string; }[] = [
  {
    name: "nikoleye",
    role: "Project Lead, Writer",
    imageFilename: "nikoleye.png"
  },
  {
    name: "samidare",
    role: "Developer",
    imageFilename: "samidare.png"
  },
  {
    name: "Stinggyray",
    role: "Developer",
    imageFilename: "stinggyray.png"
  },
  {
    name: "namtar",
    role: "Founder, Designer",
    imageFilename: "namtar.jpg"
  },
  {
    name: "kawa",
    role: "Mascot",
    imageFilename: "kawa.png"
  },
  {
    name: "Thanik",
    role: "Writer, Editor",
    imageFilename: "thanik.jpg"
  },
  {
    name: "iana",
    role: "Writer, Editor",
    imageFilename: "iana.png"
  },
  {
    name: "Kirahuang",
    role: "Host, Advisor",
    imageFilename: "kirahuang.png"
  },
  {
    name: "Noël",
    role: "Founder, Advisor",
    imageFilename: "noel.png"
  },
  {
    name: "pepegaturtle",
    role: ":pepegaturtle:",
    imageFilename: "pepegaturtle.png"
  },
];

const About: NextPage = () => {
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
          {members.map(({ name, role, imageFilename }) => {
            return (
              <li className="member-card" key={name}>
                <Image
                  className="avatar"
                  src={`/images/member-avatars/${imageFilename}`}
                  alt=""
                  width={112}
                  height={112}
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
