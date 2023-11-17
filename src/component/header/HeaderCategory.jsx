import React from "react";
import { Link } from "react-router-dom";

export default function HeaderCategory(){
  return(
    <div className="HeaderCategory">{/* 헤더메인부분의 맨 아래쪽 카테고리를 감싸는 태그 */}
      <img src="https://m.bunjang.co.kr/pc-static/resource/9ddac97c001dd6e0c2eb.png" className="categoryMenu" alt="categoryMenubar" />
      <Link to = "#">번개장터 판매자센터</Link>
      <img src="https://m.bunjang.co.kr/pc-static/resource/34a01cb11e0b14957f81.png" className="categoryRight" alt="categoryRightImg" />
    </div>
  );
}