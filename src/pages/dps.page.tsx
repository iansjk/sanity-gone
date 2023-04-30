import { useStore } from "@nanostores/react";

import {
  isCompareEnabledStore,
  toggleCompareEnabled,
} from "../components/DpsCalculator/store";
import Buffs from "../components/DpsCalculator/Buffs";
import EnemyStats from "../components/DpsCalculator/EnemyStats";
import ResultTable from "../components/DpsCalculator/ResultTable";
import Layout from "../components/Layout";

import * as classes from "./dps.css";

import type { NextPage } from "next";
import CustomCheckbox from "../components/CustomCheckbox";

const DpsCalculator: NextPage = () => {
  const isCompareEnabled = useStore(isCompareEnabledStore);

  return (
    <Layout pageTitle="DPS Calculator">
      <main className={classes.root}>
        <ResultTable />
        <CustomCheckbox
          label="Compare to the first column"
          className={classes.compareCheckbox}
          checked={isCompareEnabled}
          onChange={toggleCompareEnabled}
        />
        <EnemyStats />
        <Buffs />
      </main>
    </Layout>
  );
};

export default DpsCalculator;
