import parse from "html-react-parser";
import { Element } from "domhandler/lib/node";
import CardWithTabs from "./CardWithTabs";
import CardPanel from "./CardPanel";
import TalentInfo, { TalentObject } from "./TalentInfo";
import { replaceSelfClosingHtmlTags } from "../utils/globals";

export interface TalentsProps {
  analyses: string[];
  talentObjects: TalentObject[];
}

const Talents: React.FC<TalentsProps> = (props) => {
  const { analyses, talentObjects } = props;
  return (
    <CardWithTabs header="Talents" tabType="talent">
      {analyses.map((htmlString: string, i) => (
        <CardPanel key={i} className="talent-analysis">
          {parse(replaceSelfClosingHtmlTags(htmlString), {
            replace: (domNode) => {
              if (
                domNode instanceof Element &&
                domNode.name.toLowerCase() === "talentinfo"
              ) {
                return (
                  <TalentInfo
                    className="talents-talent-info"
                    talentObject={talentObjects[i]}
                  />
                );
              }
            },
          })}
        </CardPanel>
      ))}
    </CardWithTabs>
  );
};
export default Talents;
