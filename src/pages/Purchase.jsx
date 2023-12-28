import React, { useEffect, useState } from "react";
import ProductList from "../component/Product/ProductList";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaRegCheckCircle } from "react-icons/fa";
import { getUser } from "../util/localStorage";
import { FaRegStar, FaStar } from "react-icons/fa";


import "../style/purchase/purchase.css";

export default function Purchase() {
  const user = getUser().uid;
  const [review, setReview] = useState("");
  const [product, setProduct] = useState({image:'',name:'',price:0,date:'0'});
  const [star, setStar] = useState(5);
  const navigate = useNavigate();
  const { pid, uid, tid } = useParams();
  useEffect(() => {
    axios
      .get(`http://192.168.50.57:8000/review/${pid}/${uid}/${tid}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleStars = (num) => {
    setStar((star) => 1 + num);
  };
  const handleReview = () => {
    axios
      .post(`http://192.168.50.57:8000/review`, {
        pid,
        uid,
        tid,
        score: star,
        content: review,
      })
      .then((res) => {
        if (res.data == true) {
          alert("리뷰가 작성되었습니다.");
          navigate("/");
        }
        else alert('failed')
      });
  };

  function dateFormat(date) {
    const [datePart, timePart] = date.split(' ');
    const [year, month, day] = datePart.split('-');
    // 년월일을 '년 월 일' 형식으로 조합
    const result = `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
    return result;
  }




  return user == uid ? (
    <section className="purchaseMain inner">
      <FaRegCheckCircle className="purchase_icon" />
      <div className="purchaseMain_message">
        <span>구매가 완료되었습니다!</span>
        <br />
        <span>리뷰를 남겨주세요!</span>
      </div>
      <ProductList
        image={product.img}
        name={product.pname}
        price={product.price}
        date={dateFormat(product.date)}
      ></ProductList>
      <form onSubmit={handleSubmit}>
        <div className="stars  yStar">
          {Array.from({ length: star }).map((v, i) => (
            <FaRegStar
            key={i}
              className="star"
              onClick={() => {
                handleStars(i);
              }}
              
            ></FaRegStar>
          ))}
          {Array.from({ length: 5 - star }).map((v, i) => (
            <FaStar
              className="star"
              onClick={() => {
                handleStars(star + i);
              }}
              

            />
          ))}
        </div>
        <textarea
          name="reviewMessage"
          cols="30"
          rows="10"
          maxLength={100}
          value={review}
          onChange={(e) => setReview(e.currentTarget.value)}
        ></textarea>
        <button onClick={handleReview}>작성완료</button>
      </form>
    </section>
  ) : (
    Navigate("/error")
  );
}
