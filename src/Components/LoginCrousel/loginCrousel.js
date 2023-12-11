import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './loginCrousel.css';

function LoginCarousel(props) {

  console.log(props)
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
        {props.images.map((image, index) => (
          <div key={index} >
            <img src={image.src} alt={image.legend} className="crousel-image"/>
            <p className="legend">{image.legend}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default LoginCarousel;
