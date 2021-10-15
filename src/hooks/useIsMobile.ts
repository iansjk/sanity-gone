import { useEffect, useState } from "react";
import { breakpoints } from "../theme";

const SSR_VIEWPORT_WIDTH = 1920;

const useIsMobile = (): boolean => {
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

  return windowSize <= breakpoints.mobile;
};
export default useIsMobile;
