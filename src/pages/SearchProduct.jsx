import React, { useEffect, useState } from "react";
import '../style/searchproduct/searchproduct.css';
import { useLocation, Link } from 'react-router-dom';
import formatRelativeDate from "../util/date.js";
import Image from "../component/common/Image";
import axios from 'axios';

export default function SearchProduct(prop){
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [searchNameList, setSearchNameList] = useState([]);
  const [searchCount, setSearchCount] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    axios
    .get(`http://127.0.0.1:8000/search?query=${query}`)
    .then(data => {
      setSearchNameList(data.data)
      setSearchCount(data.data.length)
      // console.log(data.data);
    })
    .catch(error => {
      console.error("에러 발생:", error);
    });
  },[query])

  const handleSort = (sequence) => {
    let sortList = [...searchNameList];
    
    if (sequence === 'date') {
      sortList.sort((a, b) => new Date(b.regdate) - new Date(a.regdate));
    } else if (sequence === 'registration') {
      sortList.sort((a, b) => new Date(a.regdate) - new Date(b.regdate));
    }

    setSearchNameList(sortList);
    setSortBy(sequence);
  };

  return(
    <>
      <div className="searchProduct inner">
        <div className="searchproductnav">
          <h2 className="searchproducttitle">
            <div className="searchproductname">{query}</div>
            의 검색결과
            <div className="searchproductcount">{searchCount}개</div>
          </h2>

          <ul className="searchsequence">
            <li className={`searchsequence1 ${sortBy === 'date' ? 'selected' : ''}`} onClick={() => handleSort('date')}>
              최신순
            </li>
            <li className={`searchsequence2 ${sortBy === 'registration' ? 'selected' : ''}`} onClick={() => handleSort('registration')}>
              등록순
            </li>
          </ul>
        </div>

        <div className="searchproductmain">
          <ul className="searchproductcontent">
            {
              searchNameList.map(list => 
                <li>
                  <Link to = {`/productDetail/${list.pid}`} className="searchlistlink">
                    <Image className="pro_img" url={list.img} />
                    <p>{list.productName}</p>
                    <div className="searchlistinfo">
                      <div>{list.price} 원</div>
                      <div>{formatRelativeDate(list.regdate)}</div>
                    </div>
                  </Link>
                </li>
              )
            }
          </ul>
        </div>

        <div className="searchpage">
          <ul className="searchpagenation">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </div>
      </div>
    </>
  );
}