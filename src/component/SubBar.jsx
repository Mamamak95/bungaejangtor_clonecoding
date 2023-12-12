import React, { useEffect, useState } from "react";
import "../style/sub_bar/sub_bar.css";
import { Link } from "react-router-dom";
import Image from "./common/Image";

export default function SubBar() {
  const [recentProduct, setRecentProduct] = useState(null);

  useEffect(() => {
    const recentProductData = localStorage.getItem("recentProduct");
    const parsedData = recentProductData ? JSON.parse(recentProductData) : null;
    setRecentProduct(parsedData);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="sub_bar">
      <Link className="pick_prod" to={'/profile'}>
        찜한상품 
      </Link>
      <div className="last_prod">
        최근본상품
        <p className="last_prod2">
          {recentProduct ? null : "최근 본 상품이 없습니다"}
        </p>
        {recentProduct && (
          <Link to={`/productDetail/${recentProduct.pid}`}>
            <Image
              className="subbar_img"
              url={recentProduct.image}
              />
          </Link>
        )}
      </div>
      <button className="topButton" onClick={scrollToTop}>
        Top
      </button>
    </div>
  );
}
