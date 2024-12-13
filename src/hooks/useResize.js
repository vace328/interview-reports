import { useEffect, useState } from "react";

const useResize = (htmlEl) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);
  useEffect(() => {
    const getSize = () => {
        setWindowHeight(window.innerHeight);
        setElementHeight(htmlEl.current.clientHeight)
    };
    getSize();
    window.addEventListener("resize", getSize);
    return () => window.removeEventListener("resize", getSize);
  }, []);

  return windowHeight > elementHeight;
};

export default useResize;