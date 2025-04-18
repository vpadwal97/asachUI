import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function BannerDuo({ ...props }) {
  const base_UrlS = process.env.REACT_APP_BASE_URL;
  const [twoBannerEntity, setTwoBannerEntity] = useState([]);

  const dualEntityApi = async () => {
    try {
      const response = await axios.post(`/api/mediaBanner/getMedia`, {
        indexName: "entity",
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
            <React.Fragment key={index}>
              <div className="col">
                <NavLink
                  className="position-relative bg-Banner d-block rounded-2"
                  style={
                    {
                      // backgroundImage: `url("${baseUrl + entity.baimageLoc}")`,
                    }
                  }
                  to={entity.balinkvalue}
                >
                  <img
                    src={base_UrlS + entity.baimageLoc}
                    alt={entity.batitle}
                    className="img-fluid w-100 rounded-3"
                  />
                  <div className="h-100 w-100 d-flex flex-md-row flex-column justify-content-between align-items-center px-sm-4 position-absolute top-0 bottom-0 start-0 end-0 py-3">
                    <div className="d-flex flex-column justify-content-between my-2 h-100">
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
                          className="btn btn-primary hoverarrowCon d-flex align-items-center text-nowrap border-white"
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
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}

export default BannerDuo;
