import React from "react";
import '../../style/Product/product.css';
import Image from "../common/Image";

export default function ProductList({image, name, price, date}){

  return(
    <div className="product">
          <div className="pro">
            <Image
              className="pro_img"
              url="productImg\\image-1700725251398.jpg" />
            <div className="pro_comtent">
              <p className="pro_name">
                {name}
              </p>
              <div className="pro_pr_da">
                <div className="pro_price">
                  {price} 원
                </div>
                <div className="pro_date">
                  {date}
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}