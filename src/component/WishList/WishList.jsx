import { useEffect, useState } from "react";
import { getUser } from './../../util/localStorage';
import axios from "axios";
import '../../style/wish/wish.css'
import ProductList from './../Product/ProductList';
import formatRelativeDate from "../../util/date";
import { Link } from 'react-router-dom';
import Pagination from "rc-pagination";
import 'rc-pagination/assets/index.css';

export default function WishList() {

  let [list, setList] = useState([])
  const [checkBtn, setCheckBtn] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(10);
  const [pageSize, setPageSize] = useState(4);
  let [depth, setDepth] = useState(true);
  const userInfo = getUser() ? getUser() : '';
  let [sort, setSort] = useState('date');
  
  const handleSort = (value) => {
    setSort(value);
  }

  useEffect(() => {
    //startIndex , EndIndex
    let startIndex = 0;
    let endIndex = 0;

    startIndex = (currentPage - 1) * pageSize + 1; // startIndex 공삭
    endIndex = currentPage * pageSize; // endIndex 공삭
    axios({
      method: 'get',
      url: `http://localhost:8000/wishList/${userInfo.uid}/${startIndex}/${endIndex}/${sort}`
    })
      .then(res => {
        setTotalCount(res.data[0].totalItemCount)
        res.data = res.data.map(v => ({ ...v, 'check': false }))
        setList(res.data)
      })
      .catch((err) => { console.log(err) });
  }, [depth, sort]);

  const onClickAllCheck = (e) => {
    checkBtn ? list = list.map(item => ({ ...item, check: false })) : list = list.map(item => ({ ...item, check: true }))
    setCheckBtn(!checkBtn)
    setList(list)

  }

  const clickCheck = (e) => {
    setCheckBtn(false)
    let target = e.target.dataset.num
    list = list.map(v => {
      if (parseInt(v.bid) === parseInt(target)) {
        return ({ ...v, check: !v.check })
      } else {
        return v; // 조건이 false일 때 기존 객체 반환
      }
    })
    setList(list)
  }

  const deleteWishBtn = (e) => {
    let checkList = list.filter(v => v.check).map(key => key.bid)
    const result = window.confirm('삭제하시겠습니까?');

    if (result) {
      axios({
        method: 'post',
        url: `http://localhost:8000/wishList/${userInfo.uid}`,
        data: checkList
      })
        .then(res => {
          window.location.reload();
        })
        .catch((err) => { console.log(err) });
    }

  }



  return (
    <div className="wishList">
      <h2>찜<span>{list.length ? list[0]?.totalItemCount : 0}</span></h2>
      {
        list.length ?
          <>
            <div className="sortBtn">
              <div className="checkControll">
                <p className={`check ${checkBtn ? 'on' : ''}`} onClick={onClickAllCheck} ></p>
                <button type="button" className="deleteWish" onClick={deleteWishBtn}>선택삭제</button>
              </div>
              <h2>찜<span>{list ? list[0]?.totalItemCount : ''}</span></h2>
              <div className="sort">
                <span  className={sort === 'date' && 'on'} onClick={()=>{setCurrentPage(1); handleSort('date')}}>최신순</span>
                <span className={sort === 'lowPrice' && 'on'} onClick={()=>{setCurrentPage(1); handleSort('lowPrice')}}>저가순</span>
                <span className={sort === 'highPrice' && 'on'} onClick={()=>{setCurrentPage(1); handleSort('highPrice')}}>고가순</span>
              </div>
            </div>

            <ul className="wishContainer">
              {
                list.map(v =>
                  <li>
                    <Link to={`/productDetail/${v.pid}`}>
                      <ProductList image={v.productImage} place={v.place} name={v.productName} sellStatus={v.sellStatus} price={v.price} date={formatRelativeDate(v.productRegDate)} />
                    </Link>
                    <p className={`check ${v.check ? 'on' : ''}`} data-num={v.bid} onClick={clickCheck}></p>

                  </li>)
              }
            </ul>
            <Pagination
              className="d-flex justify-content-center"
              current={currentPage} //현재 페이지 번호
              total={totalCount} //전체 데이터 수
              pageSize={pageSize} //  페이지당 데이터 수
              onChange={(page) => { setCurrentPage(page); setDepth(!depth) }}
            />
          </>
          :
          <p className="noList">찜한 상품이 없습니다.</p>
      }

    </div>
  );

}