import React from "react";
import Banner from '../component/Banner/Banner';
import Product from './../component/Product/Product';
import SubBar from "../component/SubBar";

export default function Home(){
  return(
    <div className="home">
      <Banner />
      <Product />
      
    </div>
  )
}