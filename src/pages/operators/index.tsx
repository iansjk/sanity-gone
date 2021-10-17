import { graphql } from "gatsby";
import { css, Theme } from "@emotion/react";
import Layout from "../../Layout";
import { operatorPortrait } from "../../utils/images";
import { professionToClass } from "../../utils/globals";

interface Props {
  data: {
    allOperatorsJson: {
      nodes: {
        id: string;
        name: string;
        isCnOnly: boolean;
        profession: string;
        subProfessionId: string;
        rarity: number; // 0-indexed
      }[];
    };
  };
}

const Operators: React.VFC<Props> = (props) => {
  const { nodes: operators } = props.data.allOperatorsJson;

  return (
    <Layout pageTitle="Operator List">
      <main css={styles}>
        <ul className="operator-list">
          {operators.map((op) => (
            <li
              key={op.id}
              className="operator"
              //@ts-expect-error css variable
              style={{ "--bg-image": `url("${operatorPortrait(op.name)}")` }}
            >
              <div className="operator-info">
                <span className="operator-name">{op.name}</span>
                <span className="rarity">{op.rarity + 1}</span>
                <span className="operator-class">
                  {professionToClass(op.profession)}
                </span>
              </div>
              <span className="operator-subclass"></span>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};
export default Operators;

const styles = (theme: Theme) => css`
  ul.operator-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing(3)};
    justify-content: space-between;

    li.operator {
      width: 160px;
      height: 280px;
      display: grid;
      grid-template-rows: max-content 1fr max-content;
      border-radius: ${theme.spacing(0.5)};
      background-size: cover;
      background-image: linear-gradient(
          120deg,
          ${theme.palette.midtoneDarker} 0%,
          transparent 18%
        ),
        linear-gradient(to bottom, transparent 42%, #000 100%), var(--bg-image);

      /* &:hover {
        border-bottom: ${theme.spacing(0.5)} solid ${theme.palette.gray};
      } */

      .operator-info {
        grid-row: 3;
        display: grid;
        grid-template-rows: repeat(2, max-content);
        grid-template-columns: 1fr max-content;
        padding: ${theme.spacing(2)};
        row-gap: ${theme.spacing(1)};

        .operator-name {
          grid-column: span 2;
        }

        .rarity {
          grid-column: 2;
        }

        .operator-class {
          grid-row: 2;
          text-transform: uppercase;
        }
      }

      .operator-subclass {
        grid-row: 1;
      }
    }
  }
`;

export const query = graphql`
  query {
    allOperatorsJson(filter: { isNotObtainable: { eq: false } }) {
      nodes {
        id
        name
        isCnOnly
        profession
        subProfessionId
        rarity
      }
    }
  }
`;
