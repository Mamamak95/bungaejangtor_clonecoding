import React, { useState } from "react";
import Banner from '../component/Banner/Banner';
import Product from './../component/Product/Product';
import SubBar from "../component/SubBar";
import '../style/home/home.css';

export default function Home(){  

  
  return(
    <div className="inner">
      <div className="home">
        <Banner />
        <h3 className="product_title">오늘의 추천 상품</h3>
        <Product />
        <SubBar />
      </div>
    </div>
  )
}