import React, { useState, useEffect } from "react";

const MouseTracker = () => {
  const [hoveringElementIndex, setHoveringElementIndex] = useState(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: event.clientX, y: event.clientY });

    const targetElements = document.querySelectorAll("a , .btn-link , h1");
    let index = null;

    targetElements.forEach((element, i) => {
      const rect = element.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        index = i; // Store the index of the hovered element
      }
      setHoveringElementIndex(index);
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        className="red-dot"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${
            mousePosition.y
          }px, 0) ${hoveringElementIndex !== null ? "scale(1)" : "scale(0.15)"}`,
        }}
      ></div>
    </>
  );
};

export default MouseTracker;
