import { useState, memo } from "react";
import "./Image.scss";

export interface IImage {
  alt: string;
  src: string;
  height: string;
  width: string;
}

export default memo(function Image({ alt, src, height, width }: IImage) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      height={height}
      width={width}
      onLoad={() => {
        setIsImageLoaded(true);
      }}
      className={`img ${!isImageLoaded ? "loading" : ""}`}
      loading="lazy"
    />
  );
});
