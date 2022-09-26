import { DenormalizedModule } from "../utils/types";
import CardWithTabs from "./CardWithTabs";
import { moduleTypeImage } from "../utils/images";
import Image from "next/image";
import { Theme } from "@mui/material";
import { css } from "@emotion/react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import ModuleInfo from "./ModuleInfo";
import ModuleRecommendation from "./ModuleRecommendation";

export type ModuleProps = {
  operatorName: string;
  modules: DenormalizedModule[];
  moduleAnalyses: MDXRemoteSerializeResult[];
};

const Modules: React.FC<ModuleProps> = (props) => {
  const { operatorName, modules, moduleAnalyses } = props;
  const components = (index: number) => ({
    ModuleInfo: () => (
      <ModuleInfo module={modules[index]} operatorName={operatorName} />
    ),
    ModuleRecommendation,
  });

  return (
    <CardWithTabs
      css={styles}
      header="Modules"
      buttons={moduleAnalyses.map((_, i) => (
        <button
          key={i}
          aria-label={`module ${i + 1}`}
          className="module-button"
        >
          <div className="module-icon">
            <Image
              className="module-icon-image"
              width={42}
              height={42}
              src={moduleTypeImage(modules[i].moduleIcon)}
              alt=""
            />
          </div>
        </button>
      ))}
      panels={moduleAnalyses.map((panel, i) => (
        <div key={i}>
          <MDXRemote key={i} {...panel} components={components(i)} />
        </div>
      ))}
    />
  );
};
export default Modules;

const styles = (theme: Theme) => css`
  .module-button {
    position: relative;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.34;
    background-position: center;
    background-color: ${theme.palette.midtoneDarker.main} !important;
    /* workaround for a Chrome bug where mix-blend-mode: difference breaks backdrop-filter on panels;
       see https://stackoverflow.com/questions/66204563/backdrop-filter-not-working-when-mix-blend-mode-of-another-element-on-the-page-i */
    backdrop-filter: opacity(1);
    border: ${theme.spacing(0.25)} solid ${theme.palette.midtoneBrighterer.main} !important;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.67;
    }
    &.inactive:hover {
      background-color: ${theme.palette.midtone.main} !important;
    }

    &.active {
      opacity: 1;
      background-color: ${theme.palette.white.main} !important;
      border: ${theme.spacing(0.25)} solid ${theme.palette.white.main} !important;

      .module-icon-image {
        mix-blend-mode: difference;
      }
    }
  }
  .module-icon {
    display: flex;
    margin: 0 auto;

    .module-icon-image {
      border-radius: ${theme.spacing(1)};
    }
  }
`;
