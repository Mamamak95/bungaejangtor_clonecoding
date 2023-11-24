import React, { useState, useEffect } from "react";
import '../../style/Product/product.css';

export default function Product(){
  const [list, setList] = useState([])
  useEffect(()=>{
    fetch(`testData/product.json`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setList(data);
      });
    }, []);

  return(
    <div className="product">
      {list.map((list)=>
          <div className="pro">
            <img className="pro_img" src={list.image}/>
            <div className="pro_comtent">
              <h3 className="pro_name">
                {list.name}
              </h3>
              <div className="pro_pr_da">
                <div className="pro_price">
                  {list.price} 원
                </div>
                <div className="pro_date">
                  {list.date}
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  )
}