import * as classes from "./styles.css";

export interface ModuleRecommendationProps {
  stage: string; // apparently 1+ exists so just arbitrary string
  priority?: string;
  children: React.ReactNode;
}

const ModuleRecommendation: React.FC<ModuleRecommendationProps> = (props) => {
  const { stage, priority, children } = props;
  return (
    <section>
      <dl className={classes.moduleRecommendation}>
        <div className={classes.recommendedStage}>
          <dt className={classes.term}>Recommended Stage</dt>
          <dd className={classes.details}>
            {stage === "no" ? "None" : `Stage ${stage}`}
          </dd>
        </div>
        <div className={classes.priority}>
          <dt className={classes.term}>Priority</dt>
          <dd className={classes.details}>{priority ?? "--"}</dd>
        </div>
      </dl>
      {children}
    </section>
  );
};
export default ModuleRecommendation;
