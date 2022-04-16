import parse from "html-react-parser";

import Card from "./Card";

export type ModuleProps = {
  analysis: ReturnType<typeof parse> | null;
};

const Module: React.VFC<ModuleProps> = (props) => {
  const { analysis } = props;
  return (
    <Card header="Module">
      <div className="module-content">{analysis}</div>
    </Card>
  );
};
export default Module;
