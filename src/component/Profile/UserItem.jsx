import React, { useEffect } from "react";
import '../../style/wish/wish.css'
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductList from './../Product/ProductList';
import axios from 'axios';
// import { getUser } from "../../util/localStorage";
import formatRelativeDate from "../../util/date";
import Pagination from "rc-pagination/lib/Pagination";
import { getUser } from './../../util/localStorage';

export default function UserItem() {
  let [list, setList] = useState([]);
  let { uid } = useParams();
  let [seller, setSeller] = useState(uid);
  let [buyer, setBuyer] = useState(uid);
  let [sort, setSort] = useState('All');

  const handleSort = (value) => {
    setSort(value);
  }


  const userInfo = getUser() ? getUser() : '';
  console.log(userInfo.uid);
  useEffect(() => {

    axios({
      method: 'get',
      url: `http://192.168.50.57:8000/profile/${uid}/${seller}/${buyer}/${sort}`
    })
      .then((res) =>
        setList(res.data)
      )
      .catch((err) => { console.log(err) });
  }, [sort])

  return (
    <div className="wishList">
      <h2>상품<span>{list.length}</span></h2>

      {
        list.length ?
          <>
            {userInfo.uid === seller &&
              <div className="sortBtn">
                <div className="checkControll">
                </div>
                <h2>상품</h2>
                <div className="sort">
                  <span className={sort === 'All' && 'on'} onClick={() => { handleSort('All') }}>전체</span>
                  <span className={sort === 'Sell' && 'on'} onClick={() => { handleSort('Sell') }}>판매상품</span>
                  <span className={sort === 'Buy' && 'on'} onClick={() => { handleSort('Buy') }}>구매상품</span>
                </div>
              </div>}


            <ul className="wishContainer">
              {
                list.map(v =>
                  <li key={v.pid}>
                    <Link to={`/productDetail/${v.pid}`}>
                      <ProductList
                        image={v.img}
                        place={v.place}
                        name={v.productName}
                        price={v.price}
                        sellStatus={v.sellStatus}
                        date={formatRelativeDate(v.regdate)}
                      />
                    </Link>
                  </li>)
              }
            </ul>
            <Pagination
              className="d-flex justify-content-center pmpage"
            />
          </>
          :
          <p className="noList">표기할 상품이 없습니다.</p>
      }


    </div>
  )
}