import React from "react";
import '../../style/Product/product.css';
import Image from "../common/Image";


export default function ProductList({image, name, price, date, sellStatus}){
  const productClass = sellStatus === "sell" ? "sellClass" : "";

  return(
    <div className="productlist">
      <div className={`pro ${productClass}`}>      
      {sellStatus === "sell" ? (
            <div className="pro_status">
              <div className="sell">판매완료</div>
              <Image
              className="pro_img"
              url={image} 
            />
            </div>
          ) : (
            <div className="pro_status sellClass">
              <Image
              className="pro_img"
              url={image} 
            />
            </div>
          )}      

            <div className="pro_comtent">
              <p className="pro_name" >
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