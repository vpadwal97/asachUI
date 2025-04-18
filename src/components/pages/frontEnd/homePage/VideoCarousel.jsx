import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const VideoCarousel = ({ ...props }) => {
  const handleMouseEnter = (e) => {
    const currentVideo = document.querySelector(
      ".video-slick .slick-slide.slick-active.slick-center.slick-current video"
    );
    if (currentVideo === e.target) {
      e.target.play();
    }
  };

  const handleMouseLeave = (e) => {
    const currentVideo = document.querySelector(
      ".video-slick .slick-slide.slick-active.slick-center.slick-current video"
    );
    if (currentVideo === e.target) {
      e.target.pause();
    }
  };

  // https://ckcjewellers.comhttps://ckcjewellers.com/ORG-0/video/Pet_Pooch_2.mp4
  // const videos = [
  //   {
  //     src: "https://ckcjewellers.com/ORG-0/video/Pet_Pooch_2.mp4",
  //     thumbnail: videoTemp,
  //   },
  //   {
  //     src: "https://ckcjewellers.com/ORG-0/video/Kundan-shot-2a-reels.mp4",
  //     thumbnail: videoTemp,
  //   },
  //   {
  //     src: "https://ckcjewellers.com/ORG-0/video/Kundan-shot-3a-reels.mp4",
  //     thumbnail: videoTemp,
  //   },
  //   {
  //     src: "https://ckcjewellers.com/ORG-0/video/White_Sapphire_Video_1.mp4",
  //     thumbnail: videoTemp,
  //   },
  //   {
  //     src: "https://ckcjewellers.com/ORG-0/video/Per_Pooch_1.mp4",
  //     thumbnail: videoTemp,
  //   },

  //   {
  //     src: "https://ckcjewellers.com/ORG-0/video/Per_Pooch_1.mp4",
  //     thumbnail: videoTemp,
  //   },
  //   // { src: "https://ckcjewellers.com/ORG-0/video/Per_Pooch_1.mp4", thumbnail: videoTemp },
  //   // { src: "https://ckcjewellers.com/ORG-0/video/Per_Pooch_1.mp4", thumbnail: videoTemp },
  //   // { src: "https://ckcjewellers.com/ORG-0/video/Per_Pooch_1.mp4", thumbnail: videoTemp },
  //   // { src: "https://ckcjewellers.com/ORG-0/video/Per_Pooch_1.mp4", thumbnail: videoTemp },
  // ];
  const [videos, setVideos] = useState([]);

  const heroBannerApi = async () => {
    try {
      const response = await axios.post(`/api/mediaBanner/getMedia`, {
        indexName: "media",
        compID: props.banner.compID,
        componentType: "MD"
      });
      setVideos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const settings = {
    autoplay: true,
    centerMode: true,
    infinite: videos?.length > 3 ? true : false,
    centerPadding: "0px",
    slidesToShow: 5,
    arrows: false,
    // dots: true,
    draggable: true
  };
  useEffect(() => {
    heroBannerApi();
  }, []);

  return (
    <div className="video-slick no-slick-arrow">
      <Slider {...settings}>
        {videos?.map((video, index) => (
          <div key={video.barfnum} className="video-gal">
            <Link to={video.balinkvalue}>
              <video
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={(e) => handleMouseLeave(e)}
                width="100%"
                height="auto"
                loop
                playsInline
                preload="metadata"
                muted
              >
                <source
                  src={`${video.balinkvalue}?s=274x480#t=0.1`}
                  type="video/mp4"
                />
              </video>
              {/* <span className="play-btn">
                <img className="img-fluid h-100 w-100" src={video.thumbnail} alt={`Play icon ${index}`} />
              </span> */}
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoCarousel;
