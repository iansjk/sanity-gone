import { css, Theme } from "@emotion/react";
import { professionToClass } from "../utils/globals";
import { operatorClassIcon } from "../utils/images";
import { OperatorObject } from "./OperatorStats";
import OperatorPortrait from "./OperatorPortrait";

export interface OperatorInfoProps {
  operatorObject: OperatorObject;
  archetype: string;
  isLimited?: boolean;
}

const OperatorInfo: React.VFC<OperatorInfoProps> = (props) => {
  const { operatorObject, archetype, isLimited } = props;
  const { name, profession, rarity: rawRarity } = operatorObject;
  const operatorClass = professionToClass(profession);
  const rarity = rawRarity + 1; // 0-indexed;
  return (
    <div css={styles}>
      <div className="name-and-class">
        <div className="operator-name">{name}</div>
        <div className="operator-class">
          <img
            className="class-icon"
            src={operatorClassIcon(operatorClass.toLowerCase())}
            alt=""
          />
          <span className="archetype-name">{archetype}</span>
          <span>&nbsp;</span>
          <span className="class-name">{operatorClass}</span>
        </div>
      </div>
      <OperatorPortrait
        variant="normal"
        name={name}
        isLimited={isLimited}
        rarity={rarity}
      />
    </div>
  );
};
export default OperatorInfo;

const styles = (theme: Theme) => css`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;

  .name-and-class {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: ${theme.spacing(0, 0, 0, 3)};

    .operator-name {
      font-size: ${theme.typography.operatorNameHeading.size};
      font-weight: ${theme.typography.operatorNameHeading.weight};
      line-height: ${theme.typography.operatorNameHeading.lineHeight};
      margin-bottom: ${theme.spacing(1)};
    }

    .operator-class {
      display: flex;
      align-items: center;
      line-height: 32px;

      .class-icon {
        width: 24px;
        height: 24px;
        margin-right: ${theme.spacing(1)};
      }

      .archetype-name {
        color: ${theme.palette.white};
      }

      .class-name {
        color: ${theme.palette.gray};
      }
    }
  }
`;
