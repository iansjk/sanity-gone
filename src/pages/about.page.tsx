import Image from "next/image";
import Layout from "../Layout";
import aboutPageBanner from "../images/page-banners/about.jpg";
import aboutDiscordButton from "../images/page-banners/about_discord.png";
import * as classes from "./about.css";

import type { NextPage } from "next";

const memberGroups: {
  title: string;
  members: { name: string; role: string; imageFilename: string }[];
}[] = [
  {
    title: "Content",
    members: [
      {
        name: "nikoleye",
        role: "Lead Writer",
        imageFilename: "nikoleye.png",
      },
      {
        name: "Thanik",
        role: "Writer, Editor",
        imageFilename: "thanik.jpg",
      },
      {
        name: "iana",
        role: "Writer, Editor",
        imageFilename: "iana.png",
      },
      {
        name: "kawa",
        role: "Editor",
        imageFilename: "kawa.jpg",
      },
      {
        name: "PeterYR",
        role: "Writer, Editor",
        imageFilename: "pepegaturtle.png",
      },
      {
        name: "Xinbra",
        role: "Writer, Editor",
        imageFilename: "pepegaturtle.png",
      },
      {
        name: "vae",
        role: "Writer",
        imageFilename: "pepegaturtle.png",
      },
      {
        name: "cube",
        role: "Writer",
        imageFilename: "pepegaturtle.png",
      },
      {
        name: "lyrad",
        role: "Writer",
        imageFilename: "pepegaturtle.png",
      },
      {
        name: "SifiGemini0616",
        role: "Writer",
        imageFilename: "pepegaturtle.png",
      },
      {
        name: "july",
        role: "Writer",
        imageFilename: "pepegaturtle.png",
      },
    ],
  },
  {
    title: "Development",
    members: [
      {
        name: "samidare",
        role: "Lead Developer",
        imageFilename: "samidare.png",
      },
      {
        name: "Stinggyray",
        role: "Developer, Editor",
        imageFilename: "stinggyray.png",
      },
      {
        name: "Blede",
        role: "Developer",
        imageFilename: "pepegaturtle.png",
      },
      {
        name: "relearn",
        role: "Developer",
        imageFilename: "pepegaturtle.png",
      },
      {
        name: "JyuViGrace",
        role: "Developer",
        imageFilename: "pepegaturtle.png",
      },
    ],
  },
  {
    title: "Design",
    members: [
      {
        name: "namtar",
        role: "Founder, Designer",
        imageFilename: "namtar.jpg",
      },
    ],
  },
  {
    title: "Help",
    members: [
      {
        name: "Kirahuang",
        role: "Host, Advisor",
        imageFilename: "kirahuang.png",
      },
      {
        name: "Noël",
        role: "Advisor",
        imageFilename: "noel.png",
      },
      {
        name: "pepegaturtle",
        role: ":pepegaturtle:",
        imageFilename: "pepegaturtle.png",
      },
    ],
  },
];

const About: NextPage = () => {
  return (
    <Layout pageTitle="About" bannerImage={aboutPageBanner}>
      <main css={styles}>
        <section className="team-members">
          <h2>Sanity;Gone Team</h2>
          <Media lessThan="mobile">
            <div className="team-groups">
              {memberGroups.map(({ title, members }, index) => {
                return (
                  <Accordion
                    className="team-group"
                    expanded={index == 0}
                    key={title}
                    sx={{
                      backgroundColor: "transparent",
                      color: "white",
                      boxShadow: "none",
                      ":before": {
                        height: 0,
                      },
                    }}
                  >
                    <AccordionSummary
                      sx={{
                        margin: 0,
                      }}
                      expandIcon={
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.250971 3.7388C0.585598 3.4204 1.12813 3.4204 1.46276 3.7388L6.5 8.53169L11.5372 3.7388C11.8719 3.4204 12.4144 3.4204 12.749 3.7388C13.0837 4.05719 13.0837 4.57341 12.749 4.89181L7.1059 10.2612C6.77127 10.5796 6.22873 10.5796 5.8941 10.2612L0.250971 4.89181C-0.0836563 4.57341 -0.0836563 4.05719 0.250971 3.7388Z"
                            fill="#E8E8F2"
                            fillOpacity="0.8"
                          />
                        </svg>
                      }
                      // aria-controls="panel1a-content"
                      // id="panel1a-header"
                    >
                      <h3>
                        {title}
                        <span className="divider"></span>
                      </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul className="member-list">
                        {members.map(({ name, role, imageFilename }) => {
                          return (
                            <li className="member-card" key={name}>
                              <Image
                                className="avatar"
                                src={`/images/member-avatars/${imageFilename}`}
                                alt=""
                                width={48}
                                height={48}
                                objectFit="cover"
                              />
                              <div className="member-info">
                                <span className="member-name">{name}</span>
                                <span className="role">{role}</span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          </Media>
          <Media greaterThanOrEqual="mobile">
            <div className="team-groups">
              {memberGroups.map(({ title, members }) => {
                return (
                  <div className="team-group" key={title}>
                    <h3>
                      {title}
                      <span className="divider"></span>
                    </h3>
                    <ul className="member-list">
                      {members.map(({ name, role, imageFilename }) => {
                        return (
                          <li className="member-card" key={name}>
                            <Image
                              className="avatar"
                              src={`/images/member-avatars/${imageFilename}`}
                              alt=""
                              width={48}
                              height={48}
                              objectFit="cover"
                            />
                            <div className="member-info">
                              <span className="member-name">{name}</span>
                              <span className="role">{role}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Media>
        </section>
        <section className="about-footer">
          <div className="special-thanks">
            <h3>Special thanks</h3>
            <ul>
              <li>
                <b>cortz</b>, <b>Alyeska</b>, and <b>Dimbreath</b> for the help
                in early stages of development
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
          </div>
          <a
            href="https://discord.gg"
            target="_blank"
            className="discord-button"
            rel="noreferrer"
          >
            <svg
              width="79"
              height="60"
              viewBox="0 0 79 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M66.8768 4.97367C61.8416 2.67158 56.4422 0.975492 50.7967 0.00407497C50.6939 -0.0146731 50.5912 0.0321793 50.5382 0.125886C49.8438 1.35655 49.0746 2.96205 48.5359 4.22397C42.4638 3.31817 36.4229 3.31817 30.4753 4.22397C29.9365 2.934 29.1394 1.35655 28.4419 0.125886C28.3889 0.0353058 28.2862 -0.0115466 28.1834 0.00407497C22.541 0.972388 17.1416 2.66847 12.1032 4.97367C12.0596 4.99241 12.0222 5.02367 11.9974 5.06425C1.75575 20.3104 -1.04988 35.1818 0.326468 49.8688C0.332696 49.9406 0.373176 50.0093 0.429227 50.053C7.1864 54.9976 13.7319 57.9994 20.1558 59.9891C20.2586 60.0203 20.3675 59.9829 20.433 59.8985C21.9525 57.8308 23.3071 55.6505 24.4685 53.3577C24.5371 53.2235 24.4716 53.0641 24.3316 53.011C22.183 52.1989 20.1371 51.2087 18.1691 50.0843C18.0134 49.9937 18.001 49.7719 18.1442 49.6657C18.5583 49.3564 18.9726 49.0347 19.368 48.7099C19.4396 48.6505 19.5393 48.638 19.6234 48.6755C32.5522 54.5572 46.5492 54.5572 59.3256 48.6755C59.4097 48.6349 59.5094 48.6474 59.584 48.7067C59.9796 49.0316 60.3937 49.3564 60.811 49.6657C60.9542 49.7719 60.9448 49.9937 60.7892 50.0843C58.8212 51.2306 56.7753 52.1989 54.6236 53.0079C54.4835 53.061 54.4212 53.2235 54.4897 53.3577C55.6761 55.6473 57.0307 57.8275 58.5222 59.8954C58.5845 59.9829 58.6966 60.0203 58.7994 59.9891C65.2544 57.9994 71.7999 54.9976 78.557 50.053C78.6162 50.0093 78.6536 49.9437 78.6599 49.8719C80.3071 32.8921 75.9009 18.1427 66.9795 5.06736C66.9577 5.02367 66.9205 4.99241 66.8768 4.97367ZM26.3992 40.9259C22.5068 40.9259 19.2995 37.3651 19.2995 32.9921C19.2995 28.6191 22.4446 25.0583 26.3992 25.0583C30.385 25.0583 33.5612 28.6503 33.4989 32.9921C33.4989 37.3651 30.3538 40.9259 26.3992 40.9259ZM52.6494 40.9259C48.757 40.9259 45.5497 37.3651 45.5497 32.9921C45.5497 28.6191 48.6947 25.0583 52.6494 25.0583C56.6352 25.0583 59.8113 28.6503 59.7491 32.9921C59.7491 37.3651 56.6352 40.9259 52.6494 40.9259Z"
                fill="#E8E8F2"
              />
            </svg>
            <div className="background">
              <Image
                alt=""
                src={aboutDiscordButton}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </a>
        </section>
      </main>
    </Layout>
  );
};
export default About;
const styles = (theme: Theme) => css`
  margin: ${theme.spacing(0, 3)};
  background: rgba(36, 36, 46, 0.66);
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  border-radius: ${theme.spacing(1, 1, 1, 1)};

  h2 {
    margin: ${theme.spacing(0, 0, 3)};
    font-size: ${theme.typography.generalHeadingBold.fontSize}px;
    font-weight: ${theme.typography.generalHeadingBold.fontWeight};
    line-height: ${theme.typography.generalHeadingBold.lineHeight};
  }

  .team-members {
    display: flex;
    margin: ${theme.spacing(4, 0, 0)};
    flex-direction: column;
    align-items: flex-start;
    padding: ${theme.spacing(3, 3, 3)};
    gap: ${theme.spacing(3, 0, 0)};

    .fresnel-container {
      width: 100%;
    }
  }

  .team-groups {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto;
    gap: ${theme.spacing(4)};
    width: 100%;

    ${theme.breakpoints.down("mobile")} {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing(3)};
    }

    .member-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing(3)};
      margin: ${theme.spacing(3, 0, 0)};
      flex-wrap: wrap;
      max-height: 500px;

      ${theme.breakpoints.down("mobile")} {
        display: flex;
        max-height: none;
      }
    }

    .team-group {
      h3 {
        margin: ${theme.spacing(0, 0, 0)};
        font-size: ${theme.typography.teamGroupHeading.fontSize}px;
        font-weight: ${theme.typography.teamGroupHeading.fontWeight};
        line-height: ${theme.typography.teamGroupHeading.lineHeight};
        position: relative;
        display: flex;
        align-items: center;
        gap: ${theme.spacing(4)};
        color: ${theme.palette.white.main};

        ${theme.breakpoints.down("mobile")} {
          width: 100%;
        }

        span.divider {
          display: inline-block;
          width: 100%;
          height: 1px;
          background: ${theme.palette.midtoneBrighterer.main};

          ${theme.breakpoints.down("mobile")} {
            margin-right: ${theme.spacing(4)};
          }
        }
      }

      .member-card {
        display: flex;
        justify-items: center;
        align-items: center;

        .member-info {
          display: flex;
          flex-direction: column;
          margin: ${theme.spacing(0, 0, 0, 2)};
        }

        .avatar {
          border-radius: 50%;
        }

        .member-name {
          margin: ${theme.spacing(0, 0, 0)};
          font-size: ${theme.typography.memberNameHeading.fontSize}px;
          font-weight: ${theme.typography.memberNameHeading.fontWeight};
          line-height: ${theme.typography.memberNameHeading.lineHeight};
          justify-self: flex-start;
          color: ${theme.palette.white.main};
          grid-area: name;
        }

        .role {
          color: ${theme.palette.gray.main};
          font-size: ${theme.typography.memberRoleHeading.fontSize}px;
          font-weight: ${theme.typography.memberRoleHeading.fontWeight};
          line-height: ${theme.typography.memberRoleHeading.lineHeight};
        }
      }
    }
  }

  .about-footer {
    background: ${theme.palette.midtoneDarker.main};
    border-radius: ${theme.spacing(0, 0, 1, 1)};
    display: flex;
    justify-content: space-between;

    ${theme.breakpoints.down("mobile")} {
      flex-direction: column;
    }

    .special-thanks {
      padding: ${theme.spacing(3, 3, 3)};

      h3 {
        margin: ${theme.spacing(0, 0, 0)};
        text-transform: uppercase;
        font-size: ${theme.typography.cardHeading.fontSize}px;
        font-weight: ${theme.typography.cardHeading.fontWeight};
        line-height: ${theme.typography.cardHeading.lineHeight};
      }

      ul {
        margin: ${theme.spacing(3, 0, 0)};
      }

      p {
        margin: ${theme.spacing(2, 0, 0)};
      }
    }

    .discord-button {
      background-image: url("images/page-banners/about_discord.png");
      display: flex;
      align-items: center;
      justify-content: center;
      width: 340px;
      position: relative;

      ${theme.breakpoints.down("mobile")} {
        width: 100%;
        height: 210px;
      }

      svg {
        z-index: 1;
      }
    }

    .background {
      width: "100%";
      height: "100%";
      position: "absolute";
    }
  }
`;
