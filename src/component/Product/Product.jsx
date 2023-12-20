import React, { useState, useEffect } from "react";
import '../../style/Product/product.css';
import ProductList from "./ProductList";
import axios from "axios";
import { Link } from "react-router-dom";
import formatRelativeDate from "../../util/date";


export default function Product(){
  const [products, setProducts] = useState([]); 
  const [newLimit, setNewLimit] = useState(10);
  const [offset, setOffset] = useState(10);
  
  useEffect(()=>{
    axios
    .get(`http://127.0.0.1:8000/`)
    .then((result)=>
      setProducts(result.data)
      )
    .catch((err)=>console.log(err))
    }, []);

  const loadMore = () => {

    axios({
      method:'post',
      url:`http://127.0.0.1:8000/loadMore/${offset}/${newLimit}`,
    })
    .then((result) => {
      //console.log(JSON.stringify(result.data))
      setProducts((prevProducts) => [...prevProducts, ...result.data]);
      setNewLimit((prevLimit) => prevLimit )
      setOffset((prevOffset) => prevOffset + 10)
    })
    .catch((err)=>console.log(err))
    
  };

  return(
    <div className="product">
        {products.map((item)=>
            <div key={item.pid}>
              <Link to={`/productDetail/${item.pid}`} >
                <ProductList
                  image={item.img}
                  name={item.productName}
                  price={item.price}
                  date={formatRelativeDate(item.regdate)} 
                  sellStatus={item.sellStatus}
                  place={item.place}
                ></ProductList>
              </Link>
            </div>
        )}
      <div style={{clear:'both'}}></div>
      <button className="more_button" onClick={loadMore} >
        more
      </button>
    </div>
  )
}