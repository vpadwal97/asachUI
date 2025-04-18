import React, { useRef, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import { TempVariable } from "../../../constants/TempVariable";
import ProductCard from "../product/ProductCard";

function TwoBannerEntity() {
  const [show, setShow] = useState(false);
  const [placement, setPlacement] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (placement) => {
    setPlacement(placement);
    setShow(true);
  };

  const ref = useRef();
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 }, true);

  return (
    <>
      <div className="px-lg-5 twoBannerEntity mt-sm-5 pt-sm-5 my-4">
        <div
          className="row m-0 gy-3 mt-sm-5 px-md-5 mx-md-5"
          ref={ref}
        >
          <div
            // className="slideInFromLeft col-sm-4 position-relative text-md-end d-flex justify-content-end align-items-md-end px-md-0 flex-column z-1"
            className={`col-sm-4 position-relative text-md-end d-flex justify-content-end align-items-md-end px-md-0 flex-column z-1 ${
              isVisible ? "slideInFromLeft" : ""
            }`}
          >
            <div className="left-box">
              <div className="position-relative">
                <img
                  src="https://uat.ckcjewellers.com//ORG-0/Home%20Page%20Banner/size%20746%20x%20630%20pix.jpg"
                  // src={twoBannerEntity.img1src}
                  className="img-fluid"
                  alt=""
                />
                <button
                  onClick={() => {
                    handleShow("end");
                  }}
                  className="position-absolute bottom-0 start-0 btn btn-outline-light slide-effect slideLR curved-border ms-3 mb-4"
                >
                  shop the look
                </button>
              </div>
            </div>

            <div className="d-flex flex-column align-items-start text-start pb-md-5 mb-md-5 mt-md-5 mt-3">
              <h3 className="font-runalto twoBannerEntity_title font-42">
                {/* {twoBannerEntity.title && twoBannerEntity.title} */}
                The Wedding Collective
              </h3>
              <Link
                to="/"
                className="text-primary-secondary fw-medium font-16 text-decoration-none banner-text underlined position-relative my-ms-3"
              >
                VIEW COLLECTION
              </Link>
            </div>
          </div>
          <div
            // className="slideInFromRight col-sm-8"
            className={`col-sm-8 ${isVisible ? "slideInFromRight" : ""}`}
          >
            <div className="right-box position-relative">
              <img
                // src={twoBannerEntity.img2src}
                src="https://uat.ckcjewellers.com//ORG-0/Home Page Banner/size 413 x 440 pix.jpg"
                className="img-fluid w-100"
                alt=""
              />
              <button
                onClick={() => {
                  handleShow("start");
                }}
                className="position-absolute bottom-0 start-0 btn btn-outline-light slide-effect slideRL curved-border ms-3 mb-4"
              >
                shop the look
              </button>
            </div>
          </div>
        </div>
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={placement}
        className="offcanvasTwoBannerEntity"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{placement}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row mx-0 row-cols-md-3 row-cols-sm-2 row-cols-1">
            {TempVariable.ProductList &&
              TempVariable.ProductList.map((product, index) => (
                <div className="col px-1" key={index}>
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default TwoBannerEntity;
