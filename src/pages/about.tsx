import { css, Theme } from "@emotion/react";
import { rgba } from "polished";
import Layout from "../Layout";
import { sgMemberAvatar, sgPageBanner } from "../utils/images";

const members: { name: string; role: string; avatar: string }[] = [
  {
    name: "nikoleye",
    role: "Project Lead, Writer",
    avatar: "nikoleye.png",
  },
  {
    name: "samidare",
    role: "Developer",
    avatar: "samidare.png",
  },
  {
    name: "Stinggyray",
    role: "Developer",
    avatar: "sting.png",
  },
  {
    name: "namtar",
    role: "Founder, Designer",
    avatar: "namtar.jpg",
  },
  {
    name: "kawa",
    role: "Editor-in-Chief",
    avatar: "kawa.jpg",
  },
  {
    name: "Thanik",
    role: "Writer, Editor",
    avatar: "thanik.jpg",
  },
  {
    name: "Kirahuang",
    role: "Host, Advisor",
    avatar: "kirahuang.png",
  },
  {
    name: "Noël",
    role: "Founder, Advisor",
    avatar: "noel.png",
  },
  {
    name: "pepegaturtle",
    role: ":pepegaturtle:",
    avatar: "pepegaturtle.png",
  },
];

const About: React.VFC = () => {
  return (
    <Layout pageTitle="About" bannerImageUrl={sgPageBanner("about")}>
      <main css={styles}>
        <h2>Sanity;Gone Team</h2>
        <ul className="team-members">
          {members.map(({ name, role, avatar }) => (
            <li className="member-card" key={name}>
              <img className="avatar" src={sgMemberAvatar(avatar)} alt="" />
              <span className="member-name">{name}</span>
              <span className="role">{role}</span>
            </li>
          ))}
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
  padding: ${theme.spacing(0, 2)};

  h2 {
    margin: ${theme.spacing(8, 0, 0)};
    font-size: ${theme.typography.operatorNameHeading.fontSize};
    font-weight: ${theme.typography.operatorNameHeading.fontWeight};
    line-height: ${theme.typography.operatorNameHeading.lineHeight};
  }

  .team-members {
    margin: ${theme.spacing(4, 0, 0)};
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    list-style: none;
    gap: ${theme.spacing(4)};
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
        width: 128px;
        height: 128px;
        border-radius: 50%;
      }

      .member-name {
        margin: ${theme.spacing(2, 0, 0)};
        font-size: ${theme.typography.generalHeadingBold.fontSize};
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
      margin: ${theme.spacing(4, 0, 0)};
    }

    p {
      margin: ${theme.spacing(2, 0, 0)};
    }
  }
`;
