import { useState, useEffect } from "react";

const SSR_VIEWPORT_WIDTH = 1920;

const useViewportWidth = (): number => {
  const [windowSize, setWindowSize] = useState(SSR_VIEWPORT_WIDTH);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowSize(window.innerWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
export default useViewportWidth;
