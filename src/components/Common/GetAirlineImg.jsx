import React, { useState, useEffect } from "react";

const getImage = (imageName) => {
  if (!imageName) {
    return Promise.reject(new Error("Image not found"));
  }
  return import(`../../assets/images/airlineLogos/${imageName}.png`).then(
    (image) => image.default
  );
};

const GetAirlineImg = ({ imageName, ...props }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getImage(imageName)
      .then(setImageSrc)
      .catch(() => setError(true));
  }, [imageName]);

  if (error) return <>{imageName}</>;
  if (!imageSrc) return <>{imageName}</>;

  return <img src={imageSrc} alt={imageName} {...props} />;
};

export default GetAirlineImg;
