import ColorThief from 'colorthief';
import React, { useEffect, useRef, useState } from 'react';

function ColorExtractor({ imageUrl }) {
  const imgRef = useRef(null);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const img = imgRef.current;
    const colorThief = new ColorThief();

    if (img.complete) {
      const palette = colorThief.getPalette(img, 2); // get top 2 colors
      setColors(palette);
    } else {
      img.addEventListener('load', () => {
        const palette = colorThief.getPalette(img, 2);
        setColors(palette);
      });
    }
  }, [imageUrl]);

  return (
    <div>
      <img
        src={imageUrl}
        ref={imgRef}
        crossOrigin="anonymous"
        alt="logo"
        style={{ display: 'none' }}
      />
      {colors.length > 0 && (
        <div>
          <input type="color" name="primary" className="primary" value={`rgb(${colors[0].join(',')})`} />
          <input type="color" name="secondary" className="secondary" value={`rgb(${colors[1].join(',')})`} />
          <div style={{
            backgroundColor: `rgb(${colors[0].join(',')})`,
            width: 100, height: 100
          }}>Primary</div>
          <div style={{
            backgroundColor: `rgb(${colors[1].join(',')})`,
            width: 100, height: 100
          }}>Secondary</div>
        </div>
      )}
    </div>
  );
}


export default ColorExtractor;