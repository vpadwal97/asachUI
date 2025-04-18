import axios from "axios";
import { motion } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import LogoAnimation from "../../Common/LogoAnimation";
import MouseTracker from "../../Common/MouseTracker";

const loadComponent = (componentName) => {
  return React.lazy(() =>
    import(`../../pages/frontEnd/homePage/${componentName}`)
  );
};

function Homepage() {
  const base_UrlS = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(true);

  const [homeBanners, setHomeBanners] = useState([]);
  const renderHomePage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${base_UrlS}/api/CmsComponentDesignController/get`
      );

      // const response = homePageResponse;
      setHomeBanners(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    renderHomePage();
  }, []);

  return (
    <>
      {isLoading ? (
        <LogoAnimation />
      ) : (
        <>
          {homeBanners &&
            homeBanners.length > 0 &&
            homeBanners.map((banner) => {
              if (banner.isActive === true) {
                const DynamicComponent = loadComponent(banner.componentCode);
                return (
                  <Suspense
                    fallback={
                      <div className="d-flex justify-content-center py-4">
                        <Spinner animation="border" />
                      </div>
                    }
                    key={banner.id}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          bounce: 0.1,
                          duration: 0.8
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      {banner.componentName}
                      <DynamicComponent banner={banner} />
                    </motion.div>
                  </Suspense>
                );
              }
            })}
        </>
      )}
      <MouseTracker />
    </>
  );
}

export default Homepage;
