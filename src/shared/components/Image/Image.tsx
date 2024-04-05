// import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
  src: string;
  alt: string;
  beforeLoad?: () => void;
  afterLoad?: () => void;
}

function Image({ src, alt, beforeLoad, afterLoad }: Props) {
  // return <LazyLoadImage src={src} alt={alt} beforeLoad={beforeLoad} afterLoad={afterLoad} />;
  return <img src={src} alt={alt} />;
}

export default Image;
