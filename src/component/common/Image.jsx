import React from "react";
import { CiShop } from "react-icons/ci";

/**
 *
 * @param {string} className span className
 * @param {string} url image path - ex. /productImage/image.jpg
 * @returns <span className={className}><img src={http://127.0.0.1:8000/url}/><span>
 */
export default function Image({ className, url }) {
  const imgUrl = `http://127.0.0.1:8000/${url}`;
  return (
    <span className={className}>
      {url? <img src={imgUrl} /> : <CiShop />}
    </span>
  );
}
