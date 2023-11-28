import React, { Children } from "react";
import '../../style/header/header.css';

export default function Header({children}){
  return(
    <header>{/* 헤더 전체를 덮는 태그 */}
      {children}
    </header>
  );
}