import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './loginCrousel.css';

function LoginCarousel(props) {

  console.log(props.mainImage.concat(props.images))
  const settings = {
    showThumbs: false,
    infiniteLoop: true,
    emulateTouch: true,
    showArrows: false,
    showStatus: false,
    interval: 3000,
    autoPlay: true,
    autoFocus: false,
    swipeable: true,
    transitionTime: 1000
  };
  return (
    <div className="container-root">
      <Carousel {...settings}>
        {props.mainImage.concat(props.images).map((image, index) => (
          <div key={index} >
            <img src={image.src} alt={'no image to show'} className="crousel-image"/>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default LoginCarousel;
