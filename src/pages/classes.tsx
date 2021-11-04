import { graphql } from "gatsby";
import slugify from "@sindresorhus/slugify";

import Layout from "../Layout";
import { operatorClassIcon, operatorSubclassIcon } from "../utils/images";
import { css, Theme } from "@emotion/react";

interface Props {
  data: {
    allContentfulOperatorClass: {
      nodes: {
        className: string;
      }[];
    };
    allContentfulOperatorSubclass: {
      nodes: {
        subclass: string;
        subProfessionId: string;
      }[];
    };
  };
}

const Classes: React.VFC<Props> = ({ data }) => {
  const { nodes: operatorClasses } = data.allContentfulOperatorClass;
  const { nodes: operatorSubclasses } = data.allContentfulOperatorSubclass;

  return (
    <Layout pageTitle="Classes and Subclasses">
      <main css={styles}>
        <h2>Classes</h2>
        <ul>
          {operatorClasses.map(({ className }) => (
            <li key={className}>
              <img
                width={64}
                height={64}
                src={operatorClassIcon(slugify(className))}
              />
            </li>
          ))}
        </ul>
        <br />
        <h2>Subclasses</h2>
        <ul>
          {operatorSubclasses.map(({ subclass, subProfessionId }) => (
            <li key={subclass}>
              <img
                width={64}
                height={64}
                src={operatorSubclassIcon(subProfessionId)}
              />
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};
export default Classes;

const styles = (theme: Theme) => css`
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    flex-wrap: wrap;
  }

  img {
    object-fit: contain;
  }
`;

export const query = graphql`
  query {
    allContentfulOperatorClass {
      nodes {
        className
      }
    }
    allContentfulOperatorSubclass {
      nodes {
        subclass
        subProfessionId
      }
    }
  }
`;
