import React, { useEffect, useState } from "react";
import "../style/sub_bar/sub_bar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Image from "./common/Image";
import { getUser } from "../util/localStorage";

export default function SubBar({ pathname }) {
  const [recentProduct, setRecentProduct] = useState(null);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1000);
  const userInfo = getUser() || "";
  const navigate = useNavigate();


  useEffect(() => {
    const recentProductData = localStorage.getItem("recentProduct");
    const parsedData = recentProductData ? JSON.parse(recentProductData) : null;
    if (parsedData !== recentProduct) {
      setRecentProduct(parsedData);
    }
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return !isWideScreen ? null : (
    <div className="sub_bar">
      <Link
        className="pick_prod"
        to={`/profile/${userInfo.uid}`}
      >
        찜한상품
      </Link>
      <div className="last_prod">
        최근본상품
        <p className="last_prod2">
          {recentProduct ? null : "최근 본 상품이 없습니다"}
        </p>
        {recentProduct && (
          <Link to={`/productDetail/${recentProduct.pid}`}>
            <Image className="subbar_img" url={recentProduct.image} />
          </Link>
        )}
      </div>
      <button className="topButton" onClick={scrollToTop}>
        Top
      </button>
    </div>
  );
}
