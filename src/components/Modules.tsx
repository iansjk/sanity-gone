import parse from "html-react-parser";

import { DenormalizedModule } from "../utils/types";
import CardWithTabs from "./CardWithTabs";
import { moduleTypeImage } from "../utils/images";
import Image from "next/image";
import { Theme } from "@mui/material";
import { css } from "@emotion/react";

export type ModuleProps = {
  modules: DenormalizedModule[];
  moduleAnalyses: ReturnType<typeof parse>[];
};

const Modules: React.VFC<ModuleProps> = (props) => {
  const { modules, moduleAnalyses } = props;
  return (
    <CardWithTabs
      css={styles}
      header="Modules"
      buttons={moduleAnalyses.map((panel, i) => (
        <button key={i} aria-label={`module ${i + 1}`}>
          <div className="module-icon">
            <Image
              className="module-icon-image"
              width={24}
              height={24}
              src={moduleTypeImage(modules[i].moduleIcon)}
            />
          </div>
        </button>
      ))}
      panels={moduleAnalyses.map((panel, i) => (
        <div key={i}>{panel}</div>
      ))}
    />
  );
};
export default Modules;

const styles = (theme: Theme) => css`
  .module-icon {
    display: flex;
    margin: ${theme.spacing(0)};

    .module-icon-image {
    }
  }
`;
