import { css, Theme } from "@emotion/react";
import { rgba } from "polished";
import Layout from "../Layout";
import { sgMemberAvatar, sgPageBanner } from "../utils/images";

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

const About: React.VFC = () => {
  return (
    <Layout pageTitle="About" bannerImageUrl={sgPageBanner("about")}>
      <main css={styles}>
        <h2>Sanity;Gone Team</h2>
        <ul className="team-members">
          {members.map(({ name, role }) => (
            <li className="member-card" key={name}>
              <img className="avatar" src={sgMemberAvatar(name)} alt="" />
              <span className="member-name">{name}</span>
              <span className="role">{role}</span>
            </li>
          ))}
        </ul>

        <section className="special-thanks">
          <h3>Special thanks to:</h3>
          <p>
            <span className="member-name">cortz</span>,{" "}
            <span className="member-name">Alyeska</span>, and{" "}
            <span className="member-name">Dimbreath</span> for the help in early
            stages of development
          </p>
        </section>
      </main>
    </Layout>
  );
};
export default About;

const globalOverrideStyles = css`
  body {
    background-size: contain;
  }
`;

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
      background-color: ${rgba(theme.palette.midtone, 0.66)};
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
        color: ${theme.palette.gray};
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

    .member-name {
      font-weight: ${theme.typography.bodyBold.fontWeight};
    }
  }
`;
