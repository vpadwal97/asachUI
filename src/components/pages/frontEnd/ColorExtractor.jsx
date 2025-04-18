import ColorThief from "colorthief";
import React, { useEffect, useRef, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";


function ColorExtractor() {
  const imgRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");

  // Convert RGB to HEX
  const rgbToHex = (r, g, b) =>
    "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

  // Convert HEX to RGB
  const hexToRgb = (hex) => {
    // Remove "#" if present
    hex = hex.replace(/^#/, "");

    // Expand shorthand (e.g., "03F") to full form (e.g., "0033FF")
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b]; // returns an array of RGB values
  };

  const handleSwitch = () => {
    let tempColorHolder = primaryColor;
    setPrimaryColor(secondaryColor);
    setSecondaryColor(tempColorHolder);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (primaryColor && secondaryColor) {
      document.documentElement.style.setProperty("--bs-primary", primaryColor);
      document.documentElement.style.setProperty(
        "--bs-secondary",
        secondaryColor
      );
      document.documentElement.style.setProperty(
        "--bs-primary-rgb",
        hexToRgb(primaryColor)
      );
      document.documentElement.style.setProperty(
        "--bs-secondary-rgb",
        hexToRgb(secondaryColor)
      );
      console.log("Updating theme colors:", primaryColor, secondaryColor);
    }
  }, [primaryColor, secondaryColor]);

  useEffect(() => {
    const img = imgRef.current;
    const colorThief = new ColorThief();

    if (!img) return;

    const handleLoad = () => {
      try {
        const palette = colorThief.getPalette(img, 2);
        const [primary, secondary] = palette;
        setPrimaryColor(rgbToHex(...primary));
        setSecondaryColor(rgbToHex(...secondary));
      } catch (error) {
        console.error("Failed to extract colors:", error);
      }
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
      return () => img.removeEventListener("load", handleLoad);
    }
  }, [imageUrl]);

  return (
    <div className="p-4">
      <h2>Logo Color Extractor</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageUrl && (
        <img
          src={imageUrl}
          ref={imgRef}
          crossOrigin="anonymous"
          alt="Uploaded logo"
          style={{ display: "none" }}
        />
      )}
      {primaryColor && secondaryColor && (
        <div className="d-flex gap-4 mt-3">
          <div className="text-center">
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: primaryColor,
                borderRadius: 10
              }}
            />
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="mt-2"
            />
            <div className="fw-bold">{primaryColor}</div>
          </div>
          <div className="text-center">
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: secondaryColor,
                borderRadius: 10
              }}
            />
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="mt-2"
            />
            <div className="fw-bold">{secondaryColor}</div>
          </div>
        </div>
      )}
      <div className="mt-4 d-flex gap-3">
        <div className="p-3 border border-primary text-primary">
          Primary
          <button className="btn btn-primary">Button</button>
        </div>
        <button className="btn btn-link" onClick={handleSwitch}>
        <FaExchangeAlt />
        </button>
        <div className="p-3 border border-secondary text-secondary">
          Secondary
          <button className="btn btn-secondary">Button</button>
        </div>
      </div>
    </div>
  );
}

export default ColorExtractor;
