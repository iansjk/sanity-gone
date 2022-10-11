import Image from "next/image";
import { Disclosure } from "@headlessui/react";

import Layout from "../Layout";
import aboutPageBanner from "../images/page-banners/about.jpg";
import aboutDiscordButton from "../images/page-banners/about_discord.png";
import { breakpoints } from "../theme-helpers";
import useMediaQuery from "../utils/media-query";

import type { NextPage } from "next";

import * as classes from "./about.css";

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
        name: "ScifiGemini0616",
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
      {
        name: "neia",
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
  const isMobile = useMediaQuery(breakpoints.down("mobile"));

  return (
    <Layout pageTitle="About" bannerImage={aboutPageBanner}>
      <main className={classes.root}>
        <section className={classes.teamMembers}>
          <h2 className={classes.pageHeading}>Sanity;Gone Team</h2>
          <div className={classes.teamGroups}>
            {isMobile
              ? memberGroups.map(({ title, members }) => {
                  return (
                    <Disclosure key={title}>
                      <Disclosure.Button className={classes.disclosureButton}>
                        <h3 className={classes.teamGroupTitle}>
                          {title}
                          <span className={classes.divider}></span>
                        </h3>
                        <svg
                          className={classes.disclosureChevron}
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
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <ul className={classes.memberList}>
                          {members.map(({ name, role, imageFilename }) => {
                            return (
                              <li className={classes.memberCard} key={name}>
                                <Image
                                  className={classes.avatar}
                                  src={`/images/member-avatars/${imageFilename}`}
                                  alt=""
                                  width={48}
                                  height={48}
                                  objectFit="cover"
                                />
                                <div className={classes.memberInfo}>
                                  <span className={classes.memberName}>
                                    {name}
                                  </span>
                                  <span className={classes.role}>{role}</span>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </Disclosure.Panel>
                    </Disclosure>
                  );
                })
              : memberGroups.map(({ title, members }) => {
                  return (
                    <div key={title}>
                      <h3 className={classes.teamGroupTitle}>
                        {title}
                        <span className={classes.divider}></span>
                      </h3>
                      <ul className={classes.memberList}>
                        {members.map(({ name, role, imageFilename }) => {
                          return (
                            <li className={classes.memberCard} key={name}>
                              <Image
                                className={classes.avatar}
                                src={`/images/member-avatars/${imageFilename}`}
                                alt=""
                                width={48}
                                height={48}
                                objectFit="cover"
                              />
                              <div className={classes.memberInfo}>
                                <span className={classes.memberName}>
                                  {name}
                                </span>
                                <span className={classes.role}>{role}</span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
            {}
          </div>
        </section>
        <section className={classes.aboutFooter}>
          <div className={classes.specialThanks}>
            <h3 className={classes.specialThanksTitle}>Special thanks</h3>
            <ul className={classes.specialThanksList}>
              <li>
                <b>cortz</b>, <b>Alyeska</b>, and <b>Dimbreath</b> for their
                help in the early stages of development
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
            className={classes.discordButton}
            rel="noreferrer"
          >
            <svg
              className={classes.discordButtonIcon}
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
            <div className={classes.background}>
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
