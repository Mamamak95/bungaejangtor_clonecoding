import React, { useState } from "react";
import Text from "./Text";
import '../../style/profile/profilenav.css';
import WishList from './../WishList/WishList';
import Text2 from "./Text2";
import Text3 from './Text3';
import Text4 from './Text4';

export default function ProfileNavbar() {
  const [activeNav, setActiveNav] = useState("상품");

  const handleNavClick = (nav) => {
    setActiveNav(nav);
  };

  return (
    <div className="inner">
      <nav className="profile_navs">
        <span
          className={`profile_nav ${activeNav === "상품" ? "active" : ""}`}
          onClick={() => handleNavClick("상품")}
        >
          상품 0
        </span>
        <span
          className={`profile_nav ${activeNav === "상점후기" ? "active" : ""}`}
          onClick={() => handleNavClick("상점후기")}
        >
          상점후기 0
        </span>
        <span
          className={`profile_nav ${activeNav === "찜" ? "active" : ""}`}
          onClick={() => handleNavClick("찜")}
        >
          찜 0
        </span>
        <span
          className={`profile_nav ${activeNav === "팔로잉" ? "active" : ""}`}
          onClick={() => handleNavClick("팔로잉")}
        >
          팔로잉 0
        </span>
        <span
          className={`profile_nav ${activeNav === "팔로워" ? "active" : ""}`}
          onClick={() => handleNavClick("팔로워")}
        >
          팔로워
        </span>
      </nav>

      {activeNav === "상품" && <Text />}
      {activeNav === "상점후기" && <Text2/>}
      {activeNav === "찜" && <WishList />}
      {activeNav === "팔로잉" && <Text3 />}
      {activeNav === "팔로워" && <Text4 />}
    </div>
  );
}
