import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ProductCard from "../product/ProductCard";

function LeftBannerEntity({ ...props }) {
  const base_UrlS = process.env.REACT_APP_BASE_URL;
  const [leftBannerEntity, setLeftBannerEntity] = useState([]);

  const leftBannerApi = async () => {
    try {
      const response = await axios.post(`/api/entityList/getEntity`, {
        indexName: "entity",
        componentType: "PR",
        compID: props.banner.compID
      });
      let tvar = response.data[0];
      setLeftBannerEntity(tvar);
    } catch (error) {
      console.error(error);
    }
  };

  //let LeftBannerEntity = TempVariable.LeftBannerEntity;

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  useEffect(() => {
    leftBannerApi();
  }, []);

  return (
    <>
      {leftBannerEntity && (
        <div className="LeftBannerEntity my-sm-5 my-3">
          <div className="mt-lg-5 mb-3">
            <h2 className="font-30 fw-900 text-center">
              {/* {LeftBannerEntity.LeftBannerEntityTitle} */}
            </h2>
          </div>
          <div className="row m-0 align-items-center bg-secondary10">
            <div className="col-sm-3 p-0 d-flex justify-content-center">
              <Link to={leftBannerEntity.bannerLink}>
                <img
                  src={base_UrlS + leftBannerEntity.entityImg}
                  alt=""
                  className="img-fluid LeftBannerImg"
                />
              </Link>
            </div>
            <div className="col-sm-9 d-flex justify-content-center py-3 px-0 ">
              <Slider {...settings}>
                {leftBannerEntity.entityBody &&
                  leftBannerEntity.entityBody.map((product, index) => (
                    <div className="px-2" key={index}>
                      <ProductCard product={JSON.parse(product)} />
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LeftBannerEntity;
