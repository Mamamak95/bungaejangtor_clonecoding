import React from "react";
import '../../style/header/Category.css';

export default function Category(prop){
  const handleCategoryMouseLeave = (e) => {
    prop.handleCategoryMouseEnter()
  }

  return(
    <>
      <div className="Category">
        <div>ddddd</div>
      </div>
    </>
  );
}