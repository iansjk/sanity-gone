import Image from "next/image";

import Layout from "../Layout";
import aboutPageBanner from "../images/page-banners/about.jpg";
import * as classes from "./about.css";

import type { NextPage } from "next";

const members: { name: string; role: string; imageFilename: string }[] = [
  {
    name: "nikoleye",
    role: "Project Lead, Writer",
    imageFilename: "nikoleye.png",
  },
  {
    name: "samidare",
    role: "Developer",
    imageFilename: "samidare.png",
  },
  {
    name: "Stinggyray",
    role: "Developer, Editor",
    imageFilename: "stinggyray.png",
  },
  {
    name: "namtar",
    role: "Founder, Designer",
    imageFilename: "namtar.jpg",
  },
  {
    name: "kawa",
    role: "Mascot",
    imageFilename: "kawa.png",
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
    name: "Kirahuang",
    role: "Host, Advisor",
    imageFilename: "kirahuang.png",
  },
  {
    name: "Noël",
    role: "Founder, Advisor",
    imageFilename: "noel.png",
  },
  {
    name: "pepegaturtle",
    role: ":pepegaturtle:",
    imageFilename: "pepegaturtle.png",
  },
];

const About: NextPage = () => {
  return (
    <Layout pageTitle="About" bannerImage={aboutPageBanner}>
      <main className={classes.root}>
        <h2 className={classes.pageHeading}>Sanity;Gone Team</h2>
        <ul className={classes.teamMembers}>
          {members.map(({ name, role, imageFilename }) => {
            return (
              <li key={name} className={classes.memberCard}>
                <Image
                  className={classes.avatar}
                  src={`/images/member-avatars/${imageFilename}`}
                  alt=""
                  width={112}
                  height={112}
                  objectFit="cover"
                />
                <span className={classes.memberName}>{name}</span>
                <span className={classes.memberRole}>{role}</span>
              </li>
            );
          })}
        </ul>

        <section>
          <h3 className={classes.specialThanksHeading}>Special thanks to:</h3>
          <ul>
            <li>
              <b>cortz</b>, <b>Alyeska</b>, and <b>Dimbreath</b> for their help
              in the early stages of development
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
        </section>
      </main>
    </Layout>
  );
};
export default About;
