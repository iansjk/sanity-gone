import cx from "clsx";
import * as classes from "./styles.css";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  header: string;
  classes?: Partial<{
    root: string;
    headingBlock: string;
    heading: string;
  }>;
};

const Card: React.FC<CardProps> = (props) => {
  const {
    header,
    children,
    dangerouslySetInnerHTML,
    className: _,
    classes: customClasses,
    ...rest
  } = props;
  return (
    <section className={cx(classes.root, customClasses?.root)} {...rest}>
      <div className={cx(classes.headingBlock, customClasses?.headingBlock)}>
        <h2 className={cx(classes.heading, customClasses?.heading)}>
          {header}
        </h2>
      </div>
      <div
        className={classes.cardContent}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      >
        {children}
      </div>
    </section>
  );
};
export default Card;
