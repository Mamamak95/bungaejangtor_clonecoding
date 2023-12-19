import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Score from './../score/Score';
import '../../style/review/review.css'
import Image from './../common/Image';
import formatRelativeDate from "../../util/date";
import { AiOutlineThunderbolt } from "react-icons/ai";

export default function Review() {
  let { id } = useParams();
  let [score, setScore] = useState(0);
  let [percent, setPercent] = useState(0);
  let [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8000/reviewList/${id}`
    })
      .then(res => {
        let data = res.data.map(item => {
          if (item.date) {
            item.date = formatRelativeDate(item.date);
          }
          return item;
        });
        setReviewList(data);
        let total = 0;
        res.data.forEach(v => total += parseInt(v.score))
        let star = total / res.data.length;
        setScore(star)
        setPercent(100 - (100 / star))
      })
      .catch((err) => { console.log(err) });
  }, []);

  return (
    <div className="wishList reviewList">
      <h2>상점후기<span>{reviewList.length ? reviewList.length : 0}</span></h2>
      <div className="container1">
        <div>
          <div className="starBox">
            <p className="starNum">{score}</p>
            <Score score={score} />
          </div>
          <div className="middle"></div>
          <div className="percentBox">
            <p>{percent}%</p>
            <span>만족후기</span>
          </div>
        </div>
      </div>
      <ul className="review">

        {
          reviewList.map(v =>
            <li>
              <Link to={`/profile/${v.uid}`}>
                {<Image url={v.img} />}
              </Link>
              <div className="reviewContent">
                <div className="buyerName">
                  <Link to={`/profile/${v.uid}`} className="buyer">
                    {v.uid}
                  </Link>
                  <p className="buyerDate">{v.date}</p>
                </div>
                <Score score={v.score} />
                <div className="reviewTxt">{v.content}</div>
                <div className="report"><AiOutlineThunderbolt />신고하기</div>
              </div>
            </li>
          )
        }
      </ul>
    </div>

  );
}