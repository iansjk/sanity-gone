import branches from "../../../data/branches.json";
import { operatorBranchIcon } from "../../utils/images";
import Image from "next/image";
import * as classes from "./styles.css";

interface TraitInfoProps {
  subProfessionId: string;
  showSubclassIcon?: boolean;
}

const TraitInfo: React.VFC<TraitInfoProps> = ({
  subProfessionId,
  showSubclassIcon,
}) => {
  const description = branches[subProfessionId as keyof typeof branches]
    .trait as unknown as string;

  return (
    <div className={classes.traitContainer}>
      {showSubclassIcon && (
        <div className={classes.subclassIcon}>
          <Image
            src={operatorBranchIcon(subProfessionId)}
            alt=""
            width={48}
            height={48}
          />
        </div>
      )}

      <div
        className={
          showSubclassIcon ? classes.traitInfo : classes.subclassHiddenTraitInfo
        }
      >
        <span className={classes.traitLabel}>
          Trait<span className="visually-hidden">:</span>
        </span>
        <span
          className={classes.traitDescription}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};
export default TraitInfo;
