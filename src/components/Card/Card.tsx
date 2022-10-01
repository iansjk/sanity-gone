import cx from "clsx";
import * as classes from "./styles.css";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  header: string;
};

const Card: React.FC<CardProps> = (props) => {
  const { header, children, dangerouslySetInnerHTML, className, ...rest } =
    props;
  return (
    <section className={cx(classes.root, className)} {...rest}>
      <div className={classes.headingBlock}>
        <h2 className={classes.heading}>{header}</h2>
      </div>
      <div
        className={cx(classes.cardContent, "card-content")}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      >
        {children}
      </div>
    </section>
  );
};
export default Card;
