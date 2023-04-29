import * as classes from "./styles.css";

interface Props {}

const Buffs: React.FC<Props> = () => {
  return (
    <section>
      <h2>Buffs</h2>
      <label>
        Flat ATK+
        <input type="number" />
      </label>
      <label>
        ATK%+
        <input type="number" />
      </label>
      <label>
        ASPD+
        <input type="number" />
      </label>
      <label>
        Original ATK+
        <input type="number" />
      </label>
      <label>
        DMG Multiplier
        <input type="number" />
      </label>
      <label>
        SP Recovery+
        <input type="number" />
      </label>
    </section>
  );
};
export default Buffs;
