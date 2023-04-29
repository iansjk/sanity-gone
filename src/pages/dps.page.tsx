import Buffs from "../components/DpsCalculator/Buffs";
import EnemyStats from "../components/DpsCalculator/EnemyStats";
import ResultTable from "../components/DpsCalculator/ResultTable";
import Layout from "../components/Layout";

import * as classes from "./dps.css";

import type { NextPage } from "next";
import CustomCheckbox from "../components/CustomCheckbox";

const DpsCalculator: NextPage = () => {
  return (
    <Layout pageTitle="DPS Calculator">
      <main className={classes.root}>
        <ResultTable columns={[]} />
        <CustomCheckbox
          label="Compare to the first column"
          className={classes.compareCheckbox}
        />
        <EnemyStats />
        <Buffs />
      </main>
    </Layout>
  );
};

export default DpsCalculator;
