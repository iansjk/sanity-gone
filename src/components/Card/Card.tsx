import cx from "clsx";
import * as classes from "./styles.css";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  header: string;
  classes?: {
    header?: string;
    content?: string;
  };
};

const Card: React.FC<CardProps> = (props) => {
  const {
    header,
    classes: sectionClasses,
    children,
    dangerouslySetInnerHTML,
    className,
    ...rest
  } = props;
  return (
    <section className={cx(classes.root, className)} {...rest}>
      <div className={cx(classes.headingBlock, "heading-block")}>
        <h2 className={classes.heading}>{header}</h2>
      </div>
      <div
        className={cx(
          sectionClasses?.content,
          classes.cardContent,
          "card-content"
        )}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      >
        {children}
      </div>
    </section>
  );
};
export default Card;
