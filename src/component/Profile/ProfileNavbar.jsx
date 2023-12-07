import React, { useState } from "react";
import Text from "./Text";
import TextCopy from "./Text2";
import '../../style/profile/profilenav.css';

export default function ProfileNavbar() {
  const [activeNav, setActiveNav] = useState(null);

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
      {activeNav === "찜" && <TextCopy />}
    </div>
  );
}
