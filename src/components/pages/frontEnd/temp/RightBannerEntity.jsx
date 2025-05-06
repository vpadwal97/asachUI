import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ProductCard from "../product/ProductCard";

function RightBannerEntity({ ...props }) {
  const base_UrlS = import.meta.env.VITE_BASE_URL;

  const [rightBannerEntity, setRightBannerEntity] = useState([]);

  const rightBannerApi = async () => {
    try {
      const response = await axios.post(`/api/entityList/getEntity`, {
        indexName: "entity",
        componentType: "PR",
        compID: props.banner.compID
      });
      let tvar = response.data[0];
      setRightBannerEntity(tvar);
    } catch (error) {
      console.error(error);
    }
  };

  // Designing starts here
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
    rightBannerApi();
  }, []);

  return (
    <>
      {rightBannerEntity && (
        <div className="RightBannerEntity my-4">
          <div className="mt-lg-5 mb-3">
            <h2 className="font-30 fw-900 text-center">
              {/* {rightBannerEntity.RightBannerEntityTitle} */}
            </h2>
          </div>
          <div className="row m-0 align-items-center bg-secondary10">
            <div className="col-sm-9 d-flex justify-content-center py-3 px-0  order-sm-0 order-1">
              <Slider {...settings}>
                {rightBannerEntity?.entityBody &&
                  rightBannerEntity?.entityBody.map((product, index) => (
                    <div className="px-2" key={index}>
                      <ProductCard product={JSON.parse(product)} />
                    </div>
                  ))}
              </Slider>
            </div>
            <div className="col-sm-3 p-0 d-flex justify-content-center order-sm-1 order-0">
              <Link to={rightBannerEntity.bannerLink}>
                <img
                  src={base_UrlS + rightBannerEntity.entityImg}
                  alt=""
                  className="img-fluid RightBannerImg"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RightBannerEntity;
