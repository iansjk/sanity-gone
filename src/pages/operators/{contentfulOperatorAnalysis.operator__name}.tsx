import { graphql, useStaticQuery } from "gatsby";
import { SynergyQuality } from "../../components/SynergyOperator";
import Layout from "../../Layout";

interface Props {
  pageContext: any;
  params: any;
}

interface MarkdownNode {
  childMarkdownRemark: {
    html: string;
  };
}

interface OperatorAnalysisData {
  operator: {
    accentColorInHex: string;
    archetype: string;
    limited: boolean;
    name: string;
    operatorImageUrl: string;
  };
  author: {
    authorDiscordTag: string;
  }[];
  introduction: MarkdownNode;
  talent1Analysis: MarkdownNode;
  talent2Analysis: MarkdownNode;
  skill1Analysis: MarkdownNode;
  skill2Analysis: MarkdownNode;
  skill3Analysis: MarkdownNode;
  operatorSynergies: {
    operatorName: string;
    synergyQuality: SynergyQuality;
    synergyDescription: MarkdownNode;
  };
  summary: MarkdownNode;
}

const OperatorAnalysis: React.VFC<Props> = (props) => {
  const { params, pageContext } = props;
  const data: OperatorAnalysisData = useStaticQuery(graphql`
    query($id: String) {
      contentfulOperatorAnalysis(id: { eq: $id }) {
        operator {
          accentColorInHex
          archetype
          limited
          name
          operatorImageUrl
        }
        author {
          authorDiscordTag
        }
        introduction {
          childMarkdownRemark {
            html
          }
        }
        talent1Analysis {
          childMarkdownRemark {
            html
          }
        }
        talent2Analysis {
          childMarkdownRemark {
            html
          }
        }
        skill1Analysis {
          childMarkdownRemark {
            html
          }
        }
        skill2Analysis {
          childMarkdownRemark {
            html
          }
        }
        skill3Analysis {
          childMarkdownRemark {
            html
          }
        }
        operatorSynergies {
          operatorName
          synergyQuality
          synergyDescription {
            childMarkdownRemark {
              html
            }
          }
        }
        summary {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
};
export default OperatorAnalysis;
