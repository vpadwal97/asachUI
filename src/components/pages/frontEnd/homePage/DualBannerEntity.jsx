import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function DualBannerEntity({ ...props }) {
  const base_UrlS = import.meta.env.VITE_BASE_URL;
  const [twoBannerEntity, setTwoBannerEntity] = useState([]);

  const dualEntityApi = async () => {
    try {
      //   const response = await axios.post("/api/home-detail/offer-entity",{
      //     compName: props.banner.compName,
      //     compType: props.banner.compType,
      //     compID: props.banner.compID,
      //     designTag: props.banner.designTag,
      //     catalogueId: props.banner.catalogueId
      // })

      // const response = dualBannerResponse;
      // setTwoBannerEntity(response.elementList);
      const response = await axios.post(`/api/mediaBanner/getMedia`, {
        indexName: "media",
        componentType: "MD",
        compID: props.banner.compID
      });
      setTwoBannerEntity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dualEntityApi();
  }, []);

  return (
    <>
      {twoBannerEntity?.length > 0 && (
        <div className="row row-cols-md-2 row-cols-1 g-3 mx-0 my-4 dualBannerEntity">
          {twoBannerEntity?.map((entity, index) => (
            <div className="position-relative col" key={index}>
              <NavLink
                className="h-100 w-100 bg-Banner d-block px-3 rounded-2"
                style={{
                  backgroundImage: `url("${base_UrlS + entity.baimageLoc}")`
                }}
                to={entity.balinkvalue}
              >
                <div className="h-100 w-100 d-flex flex-md-row flex-column justify-content-between align-items-center px-sm-4 position-relative py-2">
                  <div className="d-flex flex-column justify-content-center my-2">
                    <span className="font-20 fw-medium text-white dualBannerEntity-title">
                      {entity.batitle}
                    </span>
                    <span className="font-15 fw-normal text-white dualBannerEntity-description">
                      {entity.caption}
                    </span>
                  </div>
                  {entity.balink && (
                    <div className="my-2">
                      <NavLink
                        className="btn btn-primary hoverarrowCon d-flex justify-content align-items-center text-nowrap border-white"
                        to={entity.balink}
                      >
                        <div className="hoverarrowCon"></div>
                        {entity.balinkvalue}
                        <div className="hoverarrowCon">
                          <span className="hoverarrow d-flex justify-content align-items-center"></span>
                        </div>
                      </NavLink>
                    </div>
                  )}
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DualBannerEntity;
