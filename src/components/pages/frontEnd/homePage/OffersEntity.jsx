import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import noIMGpng from "../../../../assets/image/noIMGBanner.png";
function OffersEntity({ ...props }) {
  const base_UrlS = process.env.REACT_APP_BASE_URL;
  const [offers, setOffers] = useState([]);

  const offerEntityApi = async () => {
    try {
      //   const response = await axios.post("/api/home-detail/offer-entity",{
      //     compName: props.banner.compName,
      //     compType: props.banner.compType,
      //     compID: props.banner.compID,
      //     designTag: props.banner.designTag,
      //     catalogueId: props.banner.catalogueId
      // })
      // await axios.post(`/api/entityList/getEntity`,
      await axios
        .post(`/api/mediaBanner/getMedia`, {
          indexName: "media",
          componentType: "MD",
          compID: props.banner.compID
        })
        .then((response) => {
          console.log(response);
          setOffers(response.data);
        })
        .catch((error) => {
          alert(error);
        });
      // const response = offersEntityResponse;
    } catch (error) {
      console.error(error);
    }
  };

  //Designing starts here
  const settings = {
    // dots: true,
    arrows: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  useEffect(() => {
    offerEntityApi();
  }, []);

  return (
    <>
      <div className="px-md-5">
        <div className="slick-arrow-insideno-slick-arrow d-flex justify-content-center">
          <Slider {...settings}>
            {offers?.map((offer, index) => (
              <div className="px-sm-3"
                key={index}
              >
                <div
                  className="bs-body-bg offer-con border overflow-hidden position-relative"
                >
                  <Link to={offer.bannerLink} className="bs-body-color">
                    <img
                      // src={
                      //   // offer.entityImg?
                      //   offer.entityImg
                      //   // `https://prod.image.theorganicworld.com/storage/app/public/banner/665eb2577fd7d.png`
                      // }
                      src={base_UrlS + offer.baimageLoc}
                      className="img-fluid offer-img"
                      alt={offer.id}
                      onError={(event) => {
                        event.target.src = noIMGpng;
                      }}
                    />
                    {(offer.basubtitle1 ||
                      offer.basubtitle ||
                      offer.basubtitle3) && (
                      <div className="offer-text-con position-absolute m-md-4 m-3 bottom-0 start-0 end-0">
                        <div className="m-2 p-md-3 p-2 offer-text d-flex flex-column position-relative bs-body-bg rounded-3 border overflow-hidden">
                          <div className="offer-catname mb-md-1 font-12 fw-800 font-Jost">
                            {offer.basubtitle1}
                          </div>
                          <div className="offer-title mb-md-1 font-21 fw-medium font-Jost">
                            {offer.basubtitle}
                          </div>
                          <div className="offer-catcount mb-md-1 font-14 fw-normal">
                            {offer.basubtitle3}
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default OffersEntity;
