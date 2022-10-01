import * as classes from "./styles.css";

export interface MasteryRecommendationProps {
  level: "no" | "1" | "2" | "3";
  priority?: string;
  children: React.ReactNode;
}

const MasteryRecommendation: React.FC<MasteryRecommendationProps> = (props) => {
  const { level, priority, children } = props;
  return (
    <section>
      <h3>Skill Mastery</h3>
      <dl className={classes.masteryRecommendation}>
        <div className={classes.recommendedRank}>
          <dt className={classes.descriptionTitle}>Recommended Rank</dt>
          <dd className={classes.description}>
            {level === "no" ? "None" : `Mastery ${level}`}
          </dd>
        </div>
        <div className={classes.priority}>
          <dt className={classes.descriptionTitle}>Priority</dt>
          <dd className={classes.description}>{priority ?? "--"}</dd>
        </div>
      </dl>
      {children}
    </section>
  );
};
export default MasteryRecommendation;
