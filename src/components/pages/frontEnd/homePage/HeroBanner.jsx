import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function HeroBanner({ ...props }) {
  const [slides, setSlides] = useState([]);
  const base_UrlS = import.meta.env.VITE_BASE_URL;

  const heroBannerApi = async () => {
    try {
      const response = await axios.post(`${base_UrlS}/api/mediaBanner/getComponent/${props.banner.componentCode}`);
      setSlides(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    heroBannerApi();
  }, []);
  return (
    <Carousel>
      {slides && slides.length > 0 && (
        <Carousel.Item>
          <img src={slides.imageLocation} alt={slides.imageName} />
          <Carousel.Caption>
            <h3>{slides.title}</h3>
            <p>{slides.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </Carousel>
  );
}

export default HeroBanner;
