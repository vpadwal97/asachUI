import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "../product/ProductCard";

function DefaultProductEntity({ ...props }) {

    
  // const componentData = TempVariable.GroupProductEntity;
  
  const [componentData, setcomponentData] = useState([]);

  const groupBannerApi = async () => {
    try {
      const response = await axios.post(`/api/entityList/getEntity`, {
        indexName: "entity",
        componentType: "PR",
        compID: props.banner.compID
      });
      let tvar = response.data;
      setcomponentData(tvar);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    groupBannerApi();
  }, [])


  
  const [activeKey, setActiveKey] = useState([true]);
  const handleChange = (index) => {
    let tempVar = new Array(activeKey.length).fill(false);
    tempVar[index] = true;
    setActiveKey(tempVar);
  };
  const DefaultProductEntity = componentData;

  // Designing starts here
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
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

  return (
    <>
      {DefaultProductEntity && (
        <div className="px-lg-5 my-sm-5 my-3">
          <div className="nav nav-tabs border-0 component-con justify-content-center align-items-center pb-2 pt-4">
            {DefaultProductEntity?.map((component, index) => (
              <React.Fragment key={index}>
                <div
                  key={component.id}
                  // className={`component nav-item`}
                  className={`component nav-item px-1 pb-2 ${
                    activeKey[index] ? "active" : ""
                  }`}
                  // onMouseEnter={() => handleChange(index)}
                  onClick={() => handleChange(index)}
                >
                  <a
                    data-toggle="tab"
                    className={`btn btn-link py-0 lh-1 underlined positon-relative text-primary-secondary text-decoration-none fw-medium font-bodoni-moda ${
                      activeKey[index] ? "active show" : ""
                    }`}
                    aria-expanded="false"
                  >
                    <div className="text-uppercase">{component.entityName}</div>
                  </a>
                </div>
                <div className="px-1 lh-1 font-30 font-bodoni-moda">
                  {index == DefaultProductEntity.length - 1 ? "" : "|"}
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="tab-content my-4">
            {DefaultProductEntity?.map((component, index) => (
              <React.Fragment key={index}>
                <div
                  key={component.name + index}
                  // id={`${component.name.replaceAll(/[^a-zA-Z0-9]/g, "")}`}
                  className={`tab-pane fade ${
                    activeKey[index] ? "active in show" : ""
                  }`}
                >
                  {/* {component.name} */}
                  <div className="d-flex justify-content-center">
                    <Slider {...settings}>
                      {/* {TempVariable.ProductList &&
                      TempVariable.ProductList.map((product, index) => ( */}
                      {component.entityBody &&
                        component.entityBody.map((product, index) => (
                          <div className="px-md-3 px-2" key={index}>
                            <ProductCard product={JSON.parse(product)} />
                          </div>
                        ))}
                    </Slider>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default DefaultProductEntity;
