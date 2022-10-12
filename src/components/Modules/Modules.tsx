import { DenormalizedModule } from "../../utils/types";
import { CardProps } from "../Card";
import CardWithTabs from "../CardWithTabs";
import { moduleTypeImage } from "../../utils/images";
import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import ModuleInfo from "../ModuleInfo";
import ModuleRecommendation from "../ModuleRecommendation";
import * as classes from "./styles.css";

export type ModulesProps = {
  operatorName: string;
  modules: DenormalizedModule[];
  moduleAnalyses: MDXRemoteSerializeResult[];
  classes?: CardProps["classes"];
};

const Modules: React.VFC<ModulesProps> = (props) => {
  const {
    operatorName,
    modules: allModules,
    moduleAnalyses: allModuleAnalyses,
    classes: cardClasses,
  } = props;
  const numModulesToShow = Math.min(
    allModules.length,
    allModuleAnalyses.length
  );
  const modules = allModules.slice(0, numModulesToShow);
  const moduleAnalyses = allModuleAnalyses.slice(0, numModulesToShow);

  const components = (index: number) => ({
    ModuleInfo: () => (
      <ModuleInfo module={modules[index]} operatorName={operatorName} />
    ),
    ModuleRecommendation,
  });

  return (
    <div className={classes.modulesContainer}>
      <CardWithTabs
        header="Modules"
        tabGroups={[
          {
            buttons: moduleAnalyses.map((_, i) => ({
              label: `module ${i + 1}`,
              image: (
                <Image
                  className={classes.moduleIcon}
                  width={42}
                  height={42}
                  src={moduleTypeImage(modules[i].moduleIcon)}
                  alt=""
                />
              ),
            })),
            panels: moduleAnalyses.map((panel, i) => (
              <div key={i}>
                <MDXRemote key={i} {...panel} components={components(i)} />
              </div>
            )),
          },
        ]}
        buttonClassName={classes.button}
        classes={cardClasses}
      />
    </div>
  );
};
export default Modules;
