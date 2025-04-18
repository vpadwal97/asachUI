import { useEffect, useState } from "react";

const useIntersectionObserver = (ref, options, onlyOnload) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!onlyOnload) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }
  }, [ref, options, onlyOnload]);

  return isIntersecting;
};

export default useIntersectionObserver;
