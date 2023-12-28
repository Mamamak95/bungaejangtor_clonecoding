import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Score from './../score/Score';
import '../../style/review/review.css'
import Image from './../common/Image';
import formatRelativeDate from "../../util/date";
import { AiOutlineThunderbolt } from "react-icons/ai";

export default function Review() {
  let { uid } = useParams();
  let [score, setScore] = useState(0);
  let [percent, setPercent] = useState(0);
  let [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://192.168.50.57:8000/reviewList/${uid}`
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
        setPercent(calculatePercentage(star))
      })
      .catch((err) => { console.log(err) });
  }, []);

  const calculatePercentage = (day) => {
    switch (day) {
      case 1:
        return 20;
      case 1.5:
        return 30;
      case 2:
        return 40;
      case 2.5:
        return 50;
      case 3:
        return 60;
      case 3.5:
        return 70;
      case 4:
        return 80;
      case 4.5:
        return 90;
      case 5:
        return 100;
      default:
        return 0;
    }
  }

  const handleLinkClick = (link) => {
    // Link 클릭 시 리로드
    window.location.replace(link)
  };
  return (
    <div className="wishList reviewList">
      <h2>상점후기<span>{reviewList.length ? reviewList.length : 0}</span></h2>
      {
        reviewList.length ?
          <>
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
                    <div className="link" onClick={() => handleLinkClick(`/profile/${v.uid}`)}>
                      {<Image url={v.img} />}
                    </div>
                    <div className="reviewContent">
                      <div className="buyerName">
                        <div onClick={() => handleLinkClick(`/profile/${v.uid}`)} className="buyer">
                          {v.uid}
                        </div>
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
          </>
          :
          <p className="noList">상점후기가 없습니다.</p>
      }


    </div>

  );
}