import * as classes from "./styles.css";

interface Props {}

const EnemyStats: React.FC<Props> = () => {
  return (
    <section>
      <h2>Enemy Stats</h2>
      <label>
        DEF
        <input type="number" />
      </label>
      <label>
        RES
        <input type="number" />
      </label>
      <label>
        Quantity
        <input type="number" />
      </label>
    </section>
  );
};
export default EnemyStats;
