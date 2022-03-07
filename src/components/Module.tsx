import { css } from "@emotion/react";
import { Theme } from "@mui/material";
import parse from "html-react-parser";

import Card from "./Card";

export type ModuleProps = {
  analysis: ReturnType<typeof parse> | null;
};

const Module: React.VFC<ModuleProps> = (props) => {
  const { analysis } = props;
  return (
    <Card header="Module" css={styles}>
      <div className="module-content">{analysis}</div>
    </Card>
  );
};
export default Module;

const styles = (theme: Theme) => css`
  .module-content {
  }
`;
