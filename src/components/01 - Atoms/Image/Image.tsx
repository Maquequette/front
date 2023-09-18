import { useState, memo } from "react";
import Dialog from "@/components/04 - Templates/Dialog/Dialog";
import "./Image.scss";
import clsx from "clsx";

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

  return (
    <div className="img">
      <img
        onClick={() => setIsOpen(true)}
        src={src}
        alt={alt}
        height={height}
        width={width}
        onLoad={() => {
          setIsImageLoaded(true);
        }}
        className={clsx(classes, `img ${!isImageLoaded ? "loading" : ""}`)}
        loading="lazy"
      />
      <Dialog visible={isOpen} id="modal__img" Dismiss={() => setIsOpen(false)}>
        <img
          src={src}
          alt={alt}
          className={`img ${!isImageLoaded ? "loading" : ""}`}
          loading="lazy"
        />
      </Dialog>
    </div>
  );
});
