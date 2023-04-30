import { useState } from "react";

import { useStore } from "@nanostores/react";
import { Dialog } from "@headlessui/react";

import {
  operatorsStore,
  calcsStore,
  canAddOperatorsStore,
  addOperator,
} from "../store";
import { HealthIcon } from "../../icons/operatorStats";
import operatorsJson from "../../../../data/operators.json";

import * as classes from "./styles.css";

const operatorNames = Object.keys(operatorsJson);

const ResultTable: React.FC = () => {
  const [isAddOperatorModalOpen, setAddOperatorModalOpen] = useState(false);
  const operators = useStore(operatorsStore);
  const calcs = useStore(calcsStore);
  const canAddOperators = useStore(canAddOperatorsStore);

  return (
    <>
      <table className={classes.root}>
        <thead>
          <tr>
            <th scope="row" className={classes.operatorRowHeader} rowSpan={2}>
              Operator
            </th>
            {operators.map(({ operatorName }) => (
              <div
                key={operatorName}
                className="visually-hidden"
                role="columnheader"
              >
                {operatorName}
              </div>
            ))}
          </tr>
          <tr>
            {operators.map(({ operatorName }) => (
              <td key={operatorName}>{operatorName}</td>
            ))}
            {/* operator names go here as <th>s */}
            {canAddOperators && (
              <td rowSpan={2}>
                <button
                  onClick={() => {
                    setAddOperatorModalOpen(true);
                  }}
                  aria-label="Add new operator column"
                  className={classes.newOperator}
                >
                  <HealthIcon pathClassName={classes.newOperatorIconPath} />
                </button>
              </td>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className={classes.rowHeader}>
              Skill Cycle
            </th>
            {calcs.map(({ skillCycle }, i) => (
              <td key={operators[i].operatorName}>
                {`${skillCycle.downtime}s + ${skillCycle.uptime}s`}
                {skillCycle.downtime > 0 && (
                  <>
                    <br />
                    <span>
                      (
                      {`${(
                        (skillCycle.uptime / skillCycle.downtime) *
                        100
                      ).toFixed(2)}%`}
                      )
                    </span>
                  </>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={classes.rowHeader}>
              Skill ATK
            </th>
            {calcs.map(({ skillAtk }, i) => (
              <td key={operators[i].operatorName}>{skillAtk}</td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={classes.rowHeader}>
              Skill Total DMG
            </th>
            {calcs.map(({ skillTotalDamage }, i) => (
              <td key={operators[i].operatorName}>{skillTotalDamage}</td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={classes.rowHeader}>
              Skill DPS
            </th>
            {calcs.map(({ skillDps }, i) => (
              <td key={operators[i].operatorName}>{skillDps}</td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={classes.rowHeader}>
              Basic Attack DPS
            </th>
            {calcs.map(({ basicAttackDps }, i) => (
              <td key={operators[i].operatorName}>{basicAttackDps}</td>
            ))}
          </tr>
          <tr>
            <th scope="row" className={classes.rowHeader}>
              Average DPS
            </th>
            {calcs.map(({ averageDps }, i) => (
              <td key={operators[i].operatorName}>{averageDps}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <Dialog
        open={isAddOperatorModalOpen}
        onClose={() => setAddOperatorModalOpen(false)}
        className={classes.dialog}
      >
        <Dialog.Panel>
          <Dialog.Title>Add new operator</Dialog.Title>

          {operatorNames.map((operatorName) => (
            <button
              key={operatorName}
              onClick={() => {
                addOperator(operatorName);
                setAddOperatorModalOpen(false);
              }}
              disabled={operators.some(
                (op) => op.operatorName === operatorName
              )}
            >
              {operatorName}
            </button>
          ))}
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
export default ResultTable;
