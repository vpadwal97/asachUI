import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/image/orangstudios.png";

function LogoAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const { innerWidth, innerHeight } = window;

    // Normalize the x position to a range of -5 to 5
    const normalizedX = ((event.clientX / innerWidth) * 10 - 5).toFixed(2);

    // Normalize the y position to a range of -5 to 5
    const normalizedY = ((event.clientY / innerHeight) * 10 - 5).toFixed(2);

    // Set the translation values
    setTranslate({
      x: normalizedX,
      y: normalizedY
    });
  };

  // Add the event listener when the component mounts
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="logoAnimation position-relative">
      <div
        className={`checkView is${
          isInView ? "In" : "NotIn"
        }View allCon container d-flex flex-wrap justify-content-center align-items-center overflow-hidden text-center`}
      >
        <div
          className={`checkView is${
            isInView ? "In" : "NotIn"
          }View topCon border p-5 m-4 rounded-pill`}
        >
          topCon
        </div>
        <div className="d-flex justify-content-center align-items-center flex-wrap w-100">
          <div
            className={`checkView is${
              isInView ? "In" : "NotIn"
            }View leftCon border p-5 m-4 rounded-pill`}
          >
            leftCon
          </div>
          <div
            className={`logocon centerCon p-5 m-4 rounded-pill position-relative text-center`}
            ref={ref}
          >
            <img src={logo} alt="" className={`logo `} />
            <div
              className={` eyes position-absolute rounded-pill bg-white left`}
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px)`
              }}
            />
            <div
              className={` eyes position-absolute rounded-pill bg-white right`}
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px)`
              }}
            />
          </div>
          <div
            className={`checkView is${
              isInView ? "In" : "NotIn"
            }View rightCon border p-5 m-4 rounded-pill`}
          >
            rightCon
          </div>
        </div>
        <div
          className={`checkView is${
            isInView ? "In" : "NotIn"
          }View bottomCom border p-5 m-4 rounded-pill`}
        >
          bottomCom
        </div>
      </div>
    </div>
  );
}

export default LogoAnimation;
