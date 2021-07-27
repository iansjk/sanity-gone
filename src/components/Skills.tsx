/** @jsxImportSource @emotion/react */
import { Theme, css } from "@emotion/react";
import parse from "html-react-parser";
import { Element } from "domhandler/lib/node";
import CardWithTabs from "./CardWithTabs";
import CardPanel from "./CardPanel";
import SkillInfo, { SkillObject } from "./SkillInfo";

const selfClosingTagRegex = /<(?<tagName>[A-Za-z]+) \/>/g;

export interface SkillsProps {
  // analysis[0] should be an analysis of skill 1,
  // and skillObjects[0] should be the game data for skill 1
  // (and so on for [1] and [2] if applicable)
  analyses: string[];
  skillObjects: SkillObject[];
}

const Skills: React.VFC<SkillsProps> = (props) => {
  const { analyses, skillObjects } = props;

  return (
    <CardWithTabs header="Skills" tabType="skill" css={styles}>
      {analyses.map((htmlString: string, i) => (
        <CardPanel key={i} className="skill-analysis">
          {parse(
            htmlString.replaceAll(
              selfClosingTagRegex,
              (_, tagName) => `<${tagName}></${tagName}>`
            ),
            {
              replace: (domNode) => {
                if (
                  domNode instanceof Element &&
                  domNode.name.toLowerCase() === "skillinfo"
                ) {
                  return (
                    <SkillInfo
                      className="skills-skill-info"
                      skillObject={skillObjects[i]}
                    />
                  );
                }
              },
            }
          )}
        </CardPanel>
      ))}
    </CardWithTabs>
  );
};
export default Skills;

const styles = (theme: Theme) => css`
  .skills-skill-info {
    margin-top: ${theme.spacing(3)};

    p {
      margin-top: 0;
    }
  }
`;
