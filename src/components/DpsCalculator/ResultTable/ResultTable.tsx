import * as classes from "./styles.css";

type OperatorOptions = any; // TODO

interface OperatorColumn {
  operatorId: string;
  stats: {
    elite: number;
    level: number;
    trust: number;
    potential: number;
    skillNumber: number;
    skillLevel: number;
    moduleType: string;
    moduleLevel: number;
  };
  options: OperatorOptions;
  skillCycle: {
    initial: number;
    period: number;
  };
  skillAtk: number;
  skillTotalDamage: number;
  skillDps: number;
  basicAttackDps: number;
  averageDps: number;
}

interface Props {
  columns: OperatorColumn[];
}

const ResultTable: React.FC<Props> = ({ columns }) => {
  return (
    <table className={classes.root}>
      <thead>
        <tr>
          <th>Operator</th>
          {/* operator names go here as <th>s */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Skill Cycle</th>
          {columns.map(({ operatorId, skillCycle }) => (
            <td key={operatorId}>{skillCycle}</td>
          ))}
        </tr>
        <tr>
          <th scope="row">Skill ATK</th>
          {columns.map(({ operatorId, skillAtk }) => (
            <td key={operatorId}>{skillAtk}</td>
          ))}
        </tr>
        <tr>
          <th scope="row">Skill Total DMG</th>
          {columns.map(({ operatorId, skillTotalDamage }) => (
            <td key={operatorId}>{skillTotalDamage}</td>
          ))}
        </tr>
        <tr>
          <th scope="row">Skill DPS</th>
          {columns.map(({ operatorId, skillDps }) => (
            <td key={operatorId}>{skillDps}</td>
          ))}
        </tr>
        <tr>
          <th scope="row">Basic Attack DPS</th>
          {columns.map(({ operatorId, basicAttackDps }) => (
            <td key={operatorId}>{basicAttackDps}</td>
          ))}
        </tr>
        <tr>
          <th scope="row">Average DPS</th>
          {columns.map(({ operatorId, averageDps }) => (
            <td key={operatorId}>{averageDps}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
export default ResultTable;
