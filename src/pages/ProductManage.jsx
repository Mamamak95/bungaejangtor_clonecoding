import React, { useEffect, useState } from "react";
import "../style/productmanage/productmanage.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUser } from "../util/localStorage";
import  axios from 'axios';
import Image from './../component/common/Image';
import Pagination from "rc-pagination/lib/Pagination";

export default function ProductManage(){
  let [list, setList] = useState([]);
  // const { uid } = useParams();
  // const { seller, buyer } = uid;
  let { uid } = useParams(); 
  let [ seller, setSeller ] = useState(uid);
  let [ buyer, setBuyer ] = useState(uid);
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [selectedProduct, setSelectedProduct] = useState([]);

  const userInfo = getUser() ? getUser() : '';

  const navigate = useNavigate();

  useEffect(()=>{
    axios({
      method : "get",
      url : `http://127.0.0.1:8000/productmanage/${userInfo.uid}/${seller}/${buyer}`
    })
    .then(res => setList(res.data))
    .catch(err=>console.log(err))
  },[])

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const ClickRevise = ()=>{
    const pid = list.pid
    if (localStorage.getItem(`editSaveImg_${userInfo.uid}`) || localStorage.getItem(`editSaveData_${userInfo.uid}`)) {
      const result = window.confirm('임시저장된 글이 있습니다 이어서 작성하시겠습니까?');
      if (result) {
        navigate(`/list/${pid}`)
      } else {
        localStorage.removeItem(`editSaveImg_${userInfo.uid}`);
        localStorage.removeItem(`editSaveData_${userInfo.uid}`);
        navigate(`/list/${pid}`)
      }
    } else {
      navigate(`/list/${pid}`)
    }
  }
  
  const handleCheckbox = (e) => {
    const productId = e.target.value;

    const isSelected = selectedProduct.includes(productId);

    if (isSelected) {
      setSelectedProduct((prevSelected) =>
        prevSelected.filter((selected) => selected !== productId)
      );
    } else {
      setSelectedProduct((prevSelected) => [...prevSelected, productId]);
    }
  };

  /* 삭제 */
  const handleDelete = (selectedProduct) => {
    if (selectedProduct.length === 0) {
        alert("선택된 상품이 없습니다.");
        return;
    }

    axios({
        method: "get",
        url: `http://127.0.0.1:8000/productmanage/${userInfo.uid}/${selectedProduct}`
    })
    .then((result) => {
        alert(JSON.stringify(result.data));
        window.location.reload();
    })
    .catch();
}

  /* 선택판매완료 */
  const handleComplete= (selectedProduct) => {
    if (selectedProduct.length === 0) {
        alert("선택된 상품이 없습니다.");
        return;
    }

    axios({
        method: "post",
        url: `http://127.0.0.1:8000/productmanage/${userInfo.uid}/${selectedProduct}`
    })
    .then((result) => {
      alert(JSON.stringify(result.data));
      window.location.reload();

      setList((prevList) =>
        prevList.map((item) =>
          selectedProduct.includes(item.pid)
            ? { ...item, sellStatus: 'sell' }
            : item
        )
      );
      setSelectedProduct([]);
    })
    .catch();
}

  return(
    <div className="inner manage">
{/* 
      <ul className="managenav">
        <Link to={`/products/new/${userInfo.uid}`}>
          <li>상품등록</li>
        </Link>
        <li className="divider"></li>
        <li style={{color:"red"}}>상품관리</li>
      </ul> 
*/}

      <div className="managesecond">
      <input className="managesearch" type="text" placeholder="상품명을 입력해주세요." />
      <select
        className="manageop"
        name=""
        id=""
        value={selectedStatus}
        onChange={handleStatusChange}
      >
        <option value="전체">전체</option>
        <option value="판매중">판매중</option>
        <option value="판매완료">판매완료</option>
      </select>
      </div>

      <button className="pmremove"
        type="button"
        onClick={() => handleDelete(selectedProduct)}
        >선택삭제</button>
        
      <button className="pmcomplete"
        type="button"
        onClick={() => handleComplete(selectedProduct)}
        >판매완료</button>

      <div className="mangethird">
        <table className="pmtable">

        <thead >
          <tr className="pmtrth" >
            <th>선택</th>
            <th className="pmthimg">사진</th>
            <th>상품상태</th>
            <th>상품명</th>
            <th>가격</th>
            <th>기능</th>
          </tr>
        </thead>


        <tbody className="pmtbody">
        {list.map(a => {
            if (selectedStatus === "판매중" && a.sellStatus === "Available") {
              return (
                <tr className="pmtr" key={a.pid}>
                  <td>
                  <input
                    type="checkbox"
                    value={a.pid}
                    onChange={handleCheckbox}
                    />
                  </td>
                  <td>
                    <Image className="pmimg" url={a.img} />
                  </td>
                  <td>
                    {a.sellStatus === "Available" ? 
                      "판매중"
                    : "판매완료"}
                  </td>
                  <td>
                    {a.productName}
                  </td>
                  <td>
                    {a.price} 원
                  </td>
                  <td>
                  { a.sellStatus === "Available" ? (
                  <Link to={`/edit/${a.pid}`}>
                      <button
                        className="pmbnt"
                        type="button"
                        onClick={ClickRevise}
                      >수정</button>
                  </Link>
                  ) : (
                    <button
                    className="pmbnt"
                    type="button"
                    onClick={() => alert("판매완료 상품입니다")}
                  >수정</button>
                  )}
                  </td>
                </tr>
              );
            } else if(selectedStatus === "판매완료" && a.sellStatus === "sell"){
              return (
                <tr className="pmtr" key={a.pid}>
                  <td>
                  <input
                    type="checkbox"
                    value={a.pid}
                    onChange={handleCheckbox}
                    />
                  </td>
                  <td>
                    <Image className="pmimg" url={a.img} />
                  </td>
                  <td>
                    {a.sellStatus === "Available" ? 
                      "판매중" : "판매완료"}
                  </td>
                  <td>
                    {a.productName}
                  </td>
                  <td>
                    {a.price} 원
                  </td>
                  <td>
                  { a.sellStatus === "Available" ? (
                  <Link to={`/edit/${a.pid}`}>
                      <button
                        className="pmbnt"
                        type="button"
                        onClick={ClickRevise}
                      >수정</button>
                  </Link>
                  ) : (
                    <button
                    className="pmbnt"
                    type="button"
                    onClick={() => alert("판매완료 상품입니다")}
                  >수정</button>
                  )}
                  </td>
                </tr>
              )
            } else if(selectedStatus === "전체" && (a.sellStatus === "sell" || a.sellStatus === "Available")){
              return (
                <tr className="pmtr" key={a.pid}>
                  <td>
                  <input
                    type="checkbox"
                    value={a.pid}
                    onChange={handleCheckbox}
                    />
                  </td>
                  <td>
                    <Image className="pmimg" url={a.img} />
                  </td>
                  <td>
                    {a.sellStatus === "Available" ? 
                      "판매중"
                    : "판매완료"}
                  </td>
                  <td>
                    {a.productName}
                  </td>
                  <td>
                    {a.price} 원
                  </td>
                  <td>
                  { a.sellStatus === "Available" ? (
                  <Link to={`/edit/${a.pid}`}>
                      <button
                        className="pmbnt"
                        type="button"
                        onClick={ClickRevise}
                      >수정</button>
                  </Link>
                  ) : (
                    <button
                    className="pmbnt"
                    type="button"
                    onClick={() => alert("판매완료 상품입니다")}
                  >수정</button>
                  )}
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
        </table>
        
        <div className="pmpage">
          <Pagination className="d-flex justify-content-center "/>
        </div>
      </div>

    </div>
  )
}