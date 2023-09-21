import { useState, memo, useMemo } from "react";
// @ts-ignore
import ImageZoom from "react-image-zoom";
import Dialog from "@/components/04 - Templates/Dialog/Dialog";
import "./Image.scss";

export interface IImage {
  alt: string;
  src: string;
  height: string;
  width: string;
  classes?: string;
}

export default memo(function Image({ alt, src, height, width, classes }: IImage) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const color = useMemo(() => {
    return ["primary", "secondary", "warn", "danger", "success", "accent"];
  }, []);

  return (
    <div className="img__container">
      <img
        onClick={() => setIsOpen(true)}
        src={src}
        alt={alt}
        height={height}
        width={width}
        onLoad={() => {
          setIsImageLoaded(true);
        }}
        className={`img ${!isImageLoaded ? `loading loading--${color.sort(() => 0.5 - Math.random())[0]}` : ""
          }`}
        loading="lazy"
      />
      <Dialog visible={isOpen} id="modal__img" Dismiss={() => setIsOpen(false)}>
        <ImageZoom src={src} alt={alt} zoom="100" />
      </Dialog>
    </div>
  );
});
