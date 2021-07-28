export enum SynergyQuality {
  "Anti-Synergy" = -1,
  "Decent",
  "Good",
  "Excellent",
}

export interface SynergyOperatorProps {
  synergyOperator: {
    name: string;
    quality: SynergyQuality;
    analysis: string;
  };
}

const SynergyOperator: React.VFC<SynergyOperatorProps> = (props) => {
  const { name, quality, analysis } = props.synergyOperator;
  return (
    <>
      <h3 className="synergy-operator-name">{name}</h3>
      <span className={`synergy-quality quality-${quality}`}>
        {SynergyQuality[quality]}
      </span>
      <div dangerouslySetInnerHTML={{ __html: analysis }} />
    </>
  );
};
export default SynergyOperator;
