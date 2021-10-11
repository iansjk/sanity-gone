import { css, Theme } from "@emotion/react";

export interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

const StrengthsWeaknesses: React.VFC<StrengthsWeaknessesProps> = () => {
  return <div css={styles}></div>;
};
export default StrengthsWeaknesses;

const styles = (theme: Theme) => css``;
