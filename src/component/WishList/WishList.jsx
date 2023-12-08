import { useEffect, useState } from "react";
import { getUser } from './../../util/localStorage';
import axios from "axios";
import '../../style/wish/wish.css'
import ProductList from './../Product/ProductList';
import formatRelativeDate from "../../util/date";
import { Link } from 'react-router-dom';

export default function WishList() {

  let [list, setList] = useState([])
  const [checkBtn, setCheckBtn] = useState(false)


  const userInfo = getUser() ? getUser() : '';
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8000/wishList/${userInfo.uid}`
    })
      .then(res => {
        console.log(res.data);
        res.data = res.data.map(v => ({ ...v, 'check': false }))
        setList(res.data)
      })
      .catch((err) => { console.log(err) });
  }, []);

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
    <div className="inner wishList">
      <h2>찜<span>{list.length}</span></h2>
      <div className="sortBtn">
        <div className="checkControll">
          <p className={`check ${checkBtn ? 'on' : ''}`} onClick={onClickAllCheck} ></p>
          <button type="button" className="deleteWish" onClick={deleteWishBtn}>선택삭제</button>
        </div>
      </div>

      <ul>
        {
          list.map(v =>
            <li>
              <Link to={`/productDetail/${v.pid}`}>
                <ProductList image={v.productImage} place={v.place} name={v.productName} price={v.price} date={formatRelativeDate(v.productRegDate)} />
              </Link>
              <p className={`check ${v.check ? 'on' : ''}`} data-num={v.bid} onClick={clickCheck}></p>

            </li>)
        }
      </ul>
    </div>
  );

}