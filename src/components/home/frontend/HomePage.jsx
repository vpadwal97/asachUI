import axios from "axios";
import { motion } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";
import LogoAnimation from "../../Common/LogoAnimation";
import MouseTracker from "../../Common/MouseTracker";

const loadComponent = (componentName) => {
  return React.lazy(() =>
    import(`../../pages/frontEnd/homePage/${componentName}.jsx`)
  );
};

function Homepage() {
  const base_UrlS = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState(true);

  const [componentDesign, setComponentDesign] = useState([]);
  const renderHomePage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${base_UrlS}/api/CmsComponentDesignController/get`
      );

      // const response = homePageResponse;
      setComponentDesign(response.data);
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
          <Suspense fallback={<LogoAnimation />}>
            {componentDesign &&
              componentDesign?.length > 0 &&
              componentDesign.map((banner) => {
                if (banner.isActive === true) {
                  const DynamicComponent = loadComponent(banner.componentCode);
                  return (
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
                  );
                }
              })}
          </Suspense>
        </>
      )}
      <MouseTracker />
    </>
  );
}

export default Homepage;
