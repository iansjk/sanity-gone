import { css, Theme } from "@emotion/react";
import parse from "html-react-parser";
import Card from "./Card";
import OperatorInfo, { OperatorInfoProps } from "./OperatorInfo";
import StrengthsWeaknesses from "./StrengthsWeaknesses";

export type IntroductionProps = OperatorInfoProps & {
  analysis: ReturnType<typeof parse>;
  strengths: string[];
  weaknesses: string[];
};

const Introduction: React.VFC<IntroductionProps> = (props) => {
  const { operatorObject, isLimited, analysis, strengths, weaknesses } = props;
  return (
    <Card header="Introduction" css={styles}>
      <OperatorInfo operatorObject={operatorObject} isLimited={isLimited} />
      <div className="introduction-content">
        {analysis}
        <StrengthsWeaknesses strengths={strengths} weaknesses={weaknesses} />
      </div>
    </Card>
  );
};
export default Introduction;

const styles = (theme: Theme) => css`
  .strengths-and-weaknesses {
    margin: ${theme.spacing(3, 0, 0)};

    ${theme.breakpoints.down("mobile")} {
      margin: ${theme.spacing(2, 0, 0)};
    }
  }
`;
