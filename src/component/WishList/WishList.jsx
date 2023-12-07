import { useEffect, useState } from "react";
import { getUser } from './../../util/localStorage';
import axios from "axios";
import '../../style/wish/wish.css'
import ProductList from './../Product/ProductList';
import formatRelativeDate from "../../util/date";
import { Link } from 'react-router-dom';

export default function WishList() {

  let [list, setList] = useState([])
  const [checkBtn, setCheckBtn] = useState('')

  const userInfo = getUser() ? getUser() : '';
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8000/wishList/${userInfo.uid}`
    })
      .then(res => {
        res.data = res.data.map(v => ({ ...v, 'check': false }))
        setList(res.data)
      })
      .catch((err) => { console.log(err) });
  }, []);

  const onClickAllCheck = (e) => {
    let className = e.target.className
    className.includes('on') ? setCheckBtn('') : setCheckBtn('on')
  }

  const clickCheck = (e) => {
    let target = e.target.dataset.num
    list = list.map(v => (v.bid === target ? { ...v, check: true } : v));
    console.log(list);
  }

  return (
    <div className="inner wishList">
      <h2>찜<span>{list.length}</span></h2>
      <div className="sortBtn">
        <div className="checkControll">
          <p className={`check ${checkBtn}`} onClick={onClickAllCheck} ></p>
        </div>
      </div>

      <ul>
        {
          list.map(v =>
            <li>
              <Link to={`/productDetail/${v.pid}`}>
                <ProductList image={v.productImage} name={v.productName} price={v.price} date={formatRelativeDate(v.productRegDate)} />
              </Link>
              <p className={`check ${checkBtn}`} data-num={v.bid} onClick={clickCheck}></p>

            </li>)
        }
      </ul>
    </div>
  );

}