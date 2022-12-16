import Carousel from 'react-material-ui-carousel';
import ImgItems from './ImgItems';

interface postImgsProps {
  postImgs: string[];
}

function ImgCarousel({ postImgs }: postImgsProps) {
  return (
    <Carousel
      autoPlay={false}
      height="800px"
      stopAutoPlayOnHover={false}
      animation="slide"
      navButtonsAlwaysVisible={true}
    >
      {postImgs.map((img, idx) => (
        <ImgItems key={idx} img={img} />
      ))}
    </Carousel>
  );
}

export default ImgCarousel;
