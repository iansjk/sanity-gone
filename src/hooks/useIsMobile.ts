import { breakpoints } from "../theme";
import useViewportWidth from "./useViewportWidth";

const useIsMobile = (): boolean => {
  const viewportWidth = useViewportWidth();
  return viewportWidth <= breakpoints.mobile;
};
export default useIsMobile;
