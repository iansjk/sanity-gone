import { useStore } from "@nanostores/react";

import { operatorsStore, calcsStore } from "../store";
import { HealthIcon } from "../../icons/operatorStats";

import * as classes from "./styles.css";

const MAX_SUPPORTED_COLUMNS = 4;

const ResultTable: React.FC = () => {
  const operators = useStore(operatorsStore);
  const calcs = useStore(calcsStore);

  return (
    <table className={classes.root}>
      <thead>
        <tr>
          <th scope="row" className={classes.operatorRowHeader}>
            Operator
          </th>
          {/* operator names go here as <th>s */}
          {operators.length < MAX_SUPPORTED_COLUMNS && (
            <th>
              <button
                aria-label="Add new operator column"
                className={classes.newOperator}
              >
                <HealthIcon pathClassName={classes.newOperatorIconPath} />
              </button>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" className={classes.rowHeader}>
            Skill Cycle
          </th>
          {calcs.map(({ skillCycle }, i) => (
            <td key={operators[i].operatorId}>{skillCycle}</td>
          ))}
        </tr>
        <tr>
          <th scope="row" className={classes.rowHeader}>
            Skill ATK
          </th>
          {calcs.map(({ skillAtk }, i) => (
            <td key={operators[i].operatorId}>{skillAtk}</td>
          ))}
        </tr>
        <tr>
          <th scope="row" className={classes.rowHeader}>
            Skill Total DMG
          </th>
          {calcs.map(({ skillTotalDamage }, i) => (
            <td key={operators[i].operatorId}>{skillTotalDamage}</td>
          ))}
        </tr>
        <tr>
          <th scope="row" className={classes.rowHeader}>
            Skill DPS
          </th>
          {calcs.map(({ skillDps }, i) => (
            <td key={operators[i].operatorId}>{skillDps}</td>
          ))}
        </tr>
        <tr>
          <th scope="row" className={classes.rowHeader}>
            Basic Attack DPS
          </th>
          {calcs.map(({ basicAttackDps }, i) => (
            <td key={operators[i].operatorId}>{basicAttackDps}</td>
          ))}
        </tr>
        <tr>
          <th scope="row" className={classes.rowHeader}>
            Average DPS
          </th>
          {calcs.map(({ averageDps }, i) => (
            <td key={operators[i].operatorId}>{averageDps}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
export default ResultTable;
