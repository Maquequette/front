import { useState, memo } from "react";
import "./Image.scss";

export interface IImage {
  alt: string;
  src: string;
}

export default memo(function Image({ alt, src }: IImage) {
  return <img src={src} alt={alt} className="img" loading="lazy" />;
});
