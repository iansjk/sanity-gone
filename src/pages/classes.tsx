import { graphql } from "gatsby";

interface Props {
  data: {
    allContentfulOperatorSubclass: {
      nodes: {
        subclass: string;
      }[];
    };
    allContentfulOperatorClass: {
      nodes: {
        className: string;
      }[];
    };
  };
}

const Classes: React.VFC<Props> = ({ data }) => {
  const { nodes: operatorClasses } = data.allContentfulOperatorClass;
  const { nodes: operatorSubclasses } = data.allContentfulOperatorSubclass;

  return (
    <main>
      <h2>Classes</h2>
      <ul>
        {operatorClasses.map(({ className }) => (
          <li key={className}>{className}</li>
        ))}
      </ul>
      <br />
      <h2>Subclasses</h2>
      <ul>
        {operatorSubclasses.map(({ subclass }) => (
          <li key={subclass}>{subclass}</li>
        ))}
      </ul>
    </main>
  );
};
export default Classes;

export const query = graphql`
  query {
    allContentfulOperatorSubclass {
      nodes {
        subclass
      }
    }
    allContentfulOperatorClass {
      nodes {
        className
      }
    }
  }
`;
