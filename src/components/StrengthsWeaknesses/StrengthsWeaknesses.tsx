import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import * as classes from "./styles.css";

export interface StrengthsWeaknessesProps {
  strengths: MDXRemoteSerializeResult;
  weaknesses: MDXRemoteSerializeResult;
}

const StrengthsWeaknesses: React.VFC<StrengthsWeaknessesProps> = (props) => {
  const { strengths, weaknesses } = props;
  return (
    <div className={classes.container}>
      <h3 className={classes.title.strengths}>Strengths</h3>
      <div className={classes.list.strengths}>
        <MDXRemote {...strengths} />
      </div>
      <h3 className={classes.title.weaknesses}>Weaknesses</h3>
      <div className={classes.list.weaknesses}>
        <MDXRemote {...weaknesses} />
      </div>
    </div>
  );
};
export default StrengthsWeaknesses;
