import React from "react";
import "../style/sub_bar/sub_bar.css"

export default function SubBar(){

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  return(
    <div className="sub_bar">
      <div className="pick_prod">
        찜한상품
      </div>
      <div className="last_prod">
        최근본상품
        <p className="last_prod2">
          최근 본 상품이 없습니다
        </p>
      </div>
      <button className="topButton" onClick={scrollToTop}>
        Top
      </button>
    </div>
  )
}