import Layout from "../../Layout";

interface Props {
  pageContext: any;
  params: any;
}

const OperatorAnalysis: React.VFC<Props> = (props) => {
  const { params, pageContext } = props;
  return (
    <Layout>
      <pre>params: {JSON.stringify(params, null, 2)}</pre>
      <pre>pageContext: {JSON.stringify(pageContext, null, 2)}</pre>
    </Layout>
  );
};
export default OperatorAnalysis;
