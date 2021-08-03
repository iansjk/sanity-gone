export interface GalleryProps {
  contents: string; // htmlstring
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const { contents } = props;
  return <div>{contents}</div>;
};
export default Gallery;
