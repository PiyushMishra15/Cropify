import { useEffect, useState } from "react";

const useProgressiveImg = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = useState(lowQualitySrc);
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = highQualitySrc;

    img.onload = () => {
      setSrc(highQualitySrc);
      setIsBlurred(false);
    };
  }, [lowQualitySrc, highQualitySrc]);

  return [src, isBlurred];
};

export default useProgressiveImg;
