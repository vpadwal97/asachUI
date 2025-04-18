import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function ScrollComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        className={`btn btn-primary scroll-con position-fixed end-0 bottom-0 m-sm-4 m-2 rounded-circle justify-content-center align-items-center ${
          isVisible ? "d-flex" : "d-none"
        } ${location.pathname === "/search" ? "mb-5" : ""}`}
        onClick={scrollToTop}
      >
        <FaChevronUp className="font-15" />
      </button>
    </>
  );
}

export default ScrollComponent;
