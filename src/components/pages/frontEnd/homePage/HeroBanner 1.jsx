import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import noIMGpng from "../../../../assets/image/noIMGBanner.png";
import { useWindowWidth } from "../../../../hooks/useWindowWidth";

function HeroBanner({ ...props }) {
  const [activeKeyslick, setActiveKeyslick] = useState([true]);
  const [hovered, setHovered] = useState(false);
  const [slides, setSlides] = useState([]);
  const sliderRef = useRef(null);
  const dotsRef = useRef(null);

  const buttonRef = useRef(null);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const windowWidth = useWindowWidth();
  const base_UrlS = import.meta.env.VITE_BASE_URL;

  const heroBannerApi = async () => {
    try {
      const response = await axios.post(`/api/mediaBanner/getMedia`, {
        indexName: "media",
        compID: props.banner.compID,
        componentType: "MD"
      });

      // const response = heroBannerResponse;
      console.log(response.data);
      setSlides(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);
  // const handleThumbnailClick = (index, e) => {
  //   setHovered(true);
  //   sliderRef.current.slickGoTo(index);
  //   let tempVar = new Array(activeKeyslick.length).fill(false);
  //   tempVar[index] = true;
  //   setActiveKeyslick(tempVar);

  //   nav2.slickGoTo(index);
  // };

  const settingsThumbs = {
    // infinite: slides.length > 6 ? true : false,
    infinite: slides?.length >= 3 ? true : false,
    speed: hovered ? 0 : 2000,

    autoplay: true,
    autoplaySpeed: 5000,

    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024, // Screen width < 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
          centerPadding: "50px"
        }
      }
    ]
  };
  // Designing starts from here
  const settings = {
    dots: true,
    arrows: false,
    infinite: slides?.length >= 3 ? true : false,
    centerMode: true,
    centerPadding: "200px",
    speed: hovered ? 0 : 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024, // Screen width < 1024px
        settings: {
          centerMode: false,
          centerPadding: "50px",
          dots: false,
          arrows: true
        }
      }
    ],
    customPaging: (i) => (
      <div
        className="text-center px-2 border border-top-0 border-start-0 border-end-0 border-3 border-transparent cursor-pointer"
        onMouseEnter={(e) => {
          e.currentTarget.click(); // Programmatically trigger the click
        }}
      >
        <label className="title font-13 fw-medium cursor-pointer">
          {slides[i].batitle}
        </label>
        <br />
        <label className="text-gray info font-12 fw-normal mb-2 cursor-pointer">
          {slides[i].caption}
        </label>
      </div>
    ),
    appendDots: (dots) => (
      <div>
        <div
          ref={dotsRef}
          className="custome-dots d-flex justify-content-center align-items-center"
        >
          <div
            className="w-75 p-2 dots-con rounded-2 slick-Thumb"
            onMouseEnter={(e) => {
              setHovered(true); // Optional: Set hovered state
            }}
            onMouseLeave={(e) => {
              setHovered(false);
            }}
          >
            <Slider
              {...settingsThumbs}
              asNavFor={nav1}
              ref={(slider) => setSlider2(slider)}
            >
              {dots}
            </Slider>
          </div>
        </div>
      </div>
    )
  };

  useEffect(() => {
    heroBannerApi();
  }, []);

  return (
    slides &&
    slides.length > 0 && (
      <>
        <div className="hero_banner no-slick-arrow mb-sm-5 mb-3">
          {/* <Slider 
      // ref={sliderRef}
      {...settings}
       asNavFor={nav2}
       ref={(slider) => {sliderRef; setSlider1(slider)}}
       > */}
          <Slider
            {...settings}
            asNavFor={nav2}
            ref={(slider) => {
              setSlider1(slider);
              sliderRef.current = slider; // Assuming sliderRef is a useRef()
            }}
          >
            {slides?.map((obj, key) => (
              <div key={key}>
                {/* {slide.mediaGalleryElements.map((obj, key) => ( */}
                <div key={key}>
                  <Link to={obj.balink}>
                    <img
                      className="hero_banner_img px-md-2 simg-fluid"
                      src={`${base_UrlS}${obj.baimageLoc}`}
                      alt={obj.baimagename}
                      onError={(event) => {
                        event.target.src = noIMGpng;
                      }}
                    />
                  </Link>
                </div>
                {/* ))} */}
              </div>
            ))}
          </Slider>
        </div>
      </>
    )
  );
}

export default HeroBanner;
