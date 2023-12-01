import { useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import "../style/detailItem/detailItem.css";

/* icons */
import { FaFacebookF, FaBook } from "react-icons/fa";
import { HiMiniMapPin } from "react-icons/hi2";
import { FaTwitter } from "react-icons/fa";
import { RiPriceTagFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

import SwiperComponent from "../component/swiper/SwiperComponent";
import Image from './../component/common/Image';
import ChatBtn from './../component/button/ChatBtn';
import WishBtn from './../component/button/WishBtn';
import Follow from './../component/button/Follow';
import * as localStorage from '../util/localStorage';
import { useParams } from "react-router";
import axios from "axios";
import formatRelativeDate from "../util/date";

export default function DetailItem() {
  const userInfo = localStorage.getUser();
  let {pid} = useParams();
  const navigate = useNavigate();
  const [info,setInfo] = useState({});
  const [productImg, setProductImg] = useState([]);


  //찜버튼 찜여부
  const [btnWish, setBtnWish] = useState(false);
  const [page, setPage] = useState(1);
  const [hover, setHover] = useState('');

  const changePage = (e) => {
    e ? setPage(1) : setPage(2)
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8000/product/${pid}`
    })
      .then(res => {
        res.data.regdate = formatRelativeDate(res.data.regdate)
        
        setInfo(res.data)
        setProductImg((res.data.images).split(','));
      })
      .catch((err) => { console.log(err) });
  }, []);

  // function formatRelativeDate(inputDate) {
  //   const currentDate = new Date();
  //   const targetDate = new Date(inputDate);
  
  //   const diffInSeconds = Math.floor((currentDate - targetDate) / 1000);
  
  //   const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
  
  //   if (diffInSeconds < 60) {
  //     return rtf.format(-diffInSeconds, 'second');
  //   } else if (diffInSeconds < 3600) {
  //     const diffInMinutes = Math.floor(diffInSeconds / 60);
  //     return rtf.format(-diffInMinutes, 'minute');
  //   } else if (diffInSeconds < 86400) {
  //     const diffInHours = Math.floor(diffInSeconds / 3600);
  //     return rtf.format(-diffInHours, 'hour');
  //   } else if (diffInSeconds < 604800) {
  //     const diffInDays = Math.floor(diffInSeconds / 86400);
  //     return rtf.format(-diffInDays, 'day');
  //   } else if (diffInSeconds < 2629746) {
  //     const diffInWeeks = Math.floor(diffInSeconds / 604800);
  //     return rtf.format(-diffInWeeks, 'week');
  //   } else if (diffInSeconds < 31556952) {
  //     const diffInMonths = Math.floor(diffInSeconds / 2629746);
  //     return rtf.format(-diffInMonths, 'month');
  //   } else {
  //     const diffInYears = Math.floor(diffInSeconds / 31556952);
  //     return rtf.format(-diffInYears, 'year');
  //   }
  // }

  return (
    <main className="inner">
      <section className="detailFirst">
        <div className="detailItem">

          <div className="productSwiper" onMouseEnter={() => setHover('on')} onMouseLeave={() => setHover('')}>
            <SwiperComponent
              changePage={() => { }}
              between={0}
              view={1}
              group={1}
              pName={false}
              pagination={{ clickable: true }}
              effect={'fade'}
              hover={hover}
              img ={productImg}
            />
          </div>





          <div>
            <div className="mainInfo">
              <p className="productName">{info.productName}</p>
              <div className="price">
                <p>{info.price}</p>
                <span>원</span>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzIiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMzIgNjAiIGZpbGw9Im5vbmUiPgogICAgPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE5MjhfMzQzNTUpIj4KICAgICAgICA8cmVjdCB3aWR0aD0iMTMyIiBoZWlnaHQ9IjYwIiBmaWxsPSJ3aGl0ZSIgLz4KICAgICAgICA8cGF0aAogICAgICAgICAgICBkPSJNMTMyIDU0LjQ4MTZWNS41MjY1MkMxMzIgMi40NzQzMSAxMjkuNDY0IDAgMTI2LjMzNSAwSDUuNjY0ODdDMi41MzYyNSAwIDAgMi40NzQzMSAwIDUuNTI2NTJWNTQuNDgxNkMtMS42Nzc1OGUtMDYgNTUuOTQ2NSAwLjU5NzEwMSA1Ny4zNTE0IDEuNjU5NzEgNTguMzg2NUMyLjcyMjMzIDU5LjQyMTYgNC4xNjMyMyA2MC4wMDIgNS42NjQ4NyA1OS45OTk4SDEyNi4zMDFDMTI3LjgwOSA2MC4wMTA4IDEyOS4yNTggNTkuNDM0MyAxMzAuMzI4IDU4LjM5ODJDMTMxLjM5OCA1Ny4zNjIyIDEzMiA1NS45NTIzIDEzMiA1NC40ODE2WiIKICAgICAgICAgICAgZmlsbD0iI0Q4MEMxOCIgLz4KICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKICAgICAgICAgICAgZD0iTTMyLjkzMyAyNy44ODU0SDQzLjYzODdWMjcuODg4N0M0My44NCAyNy44ODg3IDQzLjk0MDcgMjguMTQ2IDQzLjc5NDQgMjguMjkxOUwyNC4xNTA3IDQ4LjA4NDdDMjMuOTk5NyA0OC4yMzU1IDIzLjc0OTYgNDguMTEwOSAyMy43NzAxIDQ3Ljg5M0wyNS4yNjU4IDMxLjc1MTNMMTQuODI3NCAzMS44Njc2QzE0LjYyNDUgMzEuODY5MiAxNC41MjIzIDMxLjYxMDMgMTQuNjcwMSAzMS40NjI4TDM0LjI5MDIgMTEuOTE1OEMzNC40NDI4IDExLjc2NSAzNC42OTI5IDExLjg5NDUgMzQuNjY5MyAxMi4xMTI0TDMyLjkzMyAyNy44ODU0Wk03Ni4xOTM5IDEzLjkwOTFIODEuMTExM1Y0Ni4xMTk2SDc2LjE5MzlWMTMuOTA5MVpNNzQuMjY1NiAxNC4wODgyVjQ1LjUxNTFINjkuNDIyN1YzMC41MTkzSDY2LjUwMDRWMjUuNzg0Nkg2OS40MjI3VjE0LjA4ODJINzQuMjY1NlpNNTEuMzUwMiAzOC43MzZWNDMuMTkwMkw2OC4xODAyIDQyLjQ3MjZWMzguMDkyNkw2NS44NjIzIDM4LjE4MzRMNjUuOTI4NSAxOS4xNTRINjcuOTIzNlYxNC42OTk4SDUxLjYzOTlWMTkuMTU0SDUzLjY0MzNMNTMuNzAxMiAzOC42NDUzTDUxLjM1MDIgMzguNzM2Wk01OC40NTMgMTkuMTU0NUg2MS4xMTg3TDYxLjA1MjUgMzguMzY1NEw1OC41MTEgMzguNDY0M0w1OC40NTMgMTkuMTU0NVpNMTEyLjkwMSAxMy45MDkxSDEwNy44NDNWNDYuMTE5NkgxMTIuOTAxVjEzLjkwOTFaTTg4LjA2NTQgNDEuNDk5M0M4Ni4zOTg3IDM5Ljk5MjYgODUuNDgyNiAzNy42OTY3IDg1LjMxNyAzNC42MTE4Qzg1LjMwNTggMzQuMzM0IDg1LjI5NTEgMzQuMDU4NiA4NS4yODQ2IDMzLjc4NjJDODUuMjU2NCAzMy4wNTU2IDg1LjIyOSAzMi4zNDYgODUuMTkyOCAzMS42NjdDODUuMTQzMSAzMC43MzUgODUuMTQzMSAyOS44MDI5IDg1LjE0MzEgMjguODg3M0M4NS4xNDMxIDI3Ljk3MTcgODUuMTUxNCAyNy4wMzk2IDg1LjE5MjggMjYuMTA3NUM4NS4yMzQyIDI1LjE3NTQgODUuMjc1NiAyNC4xOTM5IDg1LjMxNyAyMy4xNzExQzg1LjQ4MjYgMjAuMDg2MSA4Ni40MDk4IDE3Ljc4NDggODguMDY1NCAxNi4yODM1Qzg5Ljg2NzEgMTQuNzIxMiA5Mi4yMDI4IDEzLjkwOTEgOTQuNTg4OSAxNC4wMTUyQzk1LjgyODMgMTQuMDAyNyA5Ny4wNjE1IDE0LjE5MjIgOTguMjM5NiAxNC41NzYxQzk5LjMxMTEgMTQuOTI4OCAxMDAuMjkyIDE1LjUxMTcgMTAxLjExMiAxNi4yODM1QzEwMS45NTIgMTcuMDkyMiAxMDIuNjA2IDE4LjA3MTEgMTAzLjAzMyAxOS4xNTRDMTAzLjUzNiAyMC40MzYzIDEwMy44MTYgMjEuNzk0OCAxMDMuODYxIDIzLjE3MTFDMTAzLjg2OCAyMy4zMjE4IDEwMy44NzYgMjMuNDcxOSAxMDMuODgzIDIzLjYyMTRDMTAzLjkyNiAyNC40ODY3IDEwMy45NjggMjUuMzMwNSAxMDMuOTY4IDI2LjEzMjNWMjguOTI4NUMxMDMuOTY4IDI5LjIzMTggMTAzLjk3MSAyOS41MzY4IDEwMy45NzQgMjkuODQzMVYyOS44NDQyVjI5Ljg0NTNDMTAzLjk3OSAzMC40NjMgMTAzLjk4NSAzMS4wODU3IDEwMy45NjggMzEuNzA4M0MxMDMuOTQzIDMyLjY0MDQgMTAzLjkxIDMzLjYwNTQgMTAzLjg2MSAzNC42MTE4QzEwMy44MiAzNS45OTM3IDEwMy41NCAzNy4zNTgyIDEwMy4wMzMgMzguNjQ1M0MxMDIuNjAxIDM5LjcyMDQgMTAxLjk0NiA0MC42OTI5IDEwMS4xMTIgNDEuNDk5M0MxMDAuMjkyIDQyLjI3MTEgOTkuMzExMSA0Mi44NTQgOTguMjM5NiA0My4yMDY3Qzk3LjA2MSA0My41ODc5IDk1LjgyNzkgNDMuNzc0NSA5NC41ODg5IDQzLjc1OTRDOTIuMjAzOSA0My44Njc4IDg5Ljg2ODQgNDMuMDU4NiA4OC4wNjU0IDQxLjQ5OTNaTTkwLjgwNTggMjEuNjIwMkM5MC41Njg1IDIyLjU2MzIgOTAuNDI3IDIzLjUyNzYgOTAuMzgzNiAyNC40OTg5QzkwLjI4NDMgMjUuOTA5NCA5MC4yMzQ2IDI3LjM2OTQgOTAuMjM0NiAyOC44ODcxQzkwLjIzNDYgMzAuNDA0OCA5MC4yODQzIDMxLjg3MzEgOTAuMzgzNiAzMy4yODM2QzkwLjQyNyAzNC4yNTIxIDkwLjU2ODQgMzUuMjEzOSA5MC44MDU4IDM2LjE1NDFDOTAuOTY0NyAzNi44MTU3IDkxLjI0NTQgMzcuNDQyMSA5MS42MzM3IDM4LjAwMTdDOTEuOTU3OSAzOC40NDQxIDkyLjM5NTMgMzguNzkxNiA5Mi45MDAzIDM5LjAwODFDOTMuNDI1MyAzOS4yMjE4IDkzLjk4ODkgMzkuMzI1NiA5NC41NTYgMzkuMzEzM0M5NS4xMjI4IDM5LjMyMzYgOTUuNjg2IDM5LjIxOTcgOTYuMjExNiAzOS4wMDgxQzk2LjcxNjYgMzguNzkxNiA5Ny4xNTQgMzguNDQ0MSA5Ny40NzgyIDM4LjAwMTdDOTcuODY2NiAzNy40NDIyIDk4LjE0NzMgMzYuODE1NyA5OC4zMDYxIDM2LjE1NDFDOTguNTQ2NyAzNS4yMTQyIDk4LjY5MDkgMzQuMjUyNSA5OC43MzY2IDMzLjI4MzZDOTguODI3NiAzMS44NzMxIDk4Ljg3NzMgMzAuNDIxMyA5OC44NzczIDI4LjkxMTlDOTguODc3MyAyNy40MDI0IDk4LjgyNzYgMjUuOTI1OSA5OC43MzY2IDI0LjQ5ODlDOTguNjkwOCAyMy41MjczIDk4LjU0NjYgMjIuNTYyOCA5OC4zMDYxIDIxLjYyMDJDOTguMTQ3MyAyMC45NjExIDk3Ljg2NjUgMjAuMzM3MyA5Ny40NzgyIDE5Ljc4MDdDOTcuMTU2NSAxOS4zMzYxIDk2LjcxODMgMTguOTg4IDk2LjIxMTYgMTguNzc0NEM5NS42ODYgMTguNTYyNyA5NS4xMjI4IDE4LjQ1ODkgOTQuNTU2IDE4LjQ2OTJDOTMuOTg4OSAxOC40NTY4IDkzLjQyNTMgMTguNTYwNyA5Mi45MDAzIDE4Ljc3NDRDOTIuMzkzNiAxOC45ODggOTEuOTU1NCAxOS4zMzYxIDkxLjYzMzcgMTkuNzgwN0M5MS4yNDU0IDIwLjMzNzMgOTAuOTY0NiAyMC45NjExIDkwLjgwNTggMjEuNjIwMloiCiAgICAgICAgICAgIGZpbGw9IndoaXRlIiAvPgogICAgPC9nPgogICAgPGRlZnM+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJjbGlwMF8xOTI4XzM0MzU1Ij4KICAgICAgICAgICAgPHJlY3Qgd2lkdGg9IjEzMiIgaGVpZ2h0PSI2MCIgZmlsbD0id2hpdGUiIC8+CiAgICAgICAgPC9jbGlwUGF0aD4KICAgIDwvZGVmcz4KPC9zdmc+"
                  alt="번개페이 가능"
                  class="thunderImg"
                ></img>
              </div>
            </div>

            <div className="subInfo">
              <div className="infoIcon">
                <div>
                  <p>
                    <img
                      src="https://m.bunjang.co.kr/pc-static/resource/e92ccca1b575780c7cb4.png"
                      alt=""
                    />
                    <span>7</span>
                  </p>
                  <p>
                    <img
                      src="https://m.bunjang.co.kr/pc-static/resource/95ccf1c901ac09d733ec.png"
                      alt=""
                    />
                    <span>370</span>
                  </p>
                  <p>
                    <img
                      src="https://m.bunjang.co.kr/pc-static/resource/f5ac734eb33eb0faa3b4.png"
                      alt=""
                    />
                    <span>{info.regdate}</span>
                  </p>
                </div>
                <button>
                  <img
                    src="https://m.bunjang.co.kr/pc-static/resource/0acf058f19649d793382.png"
                    alt=""
                  />
                  신고하기
                </button>
              </div>
            </div>

            <div className="productCondition">
              <div>
                <p>상품상태</p>
                <span>새 상품</span>
              </div>
              <div>
                <p>교환여부</p>
                <span>교환불가능</span>
              </div>
              <div>
                <p>배송비</p>
                <span>배송비 별도</span>
              </div>
              <div>
                <p>거래지역</p>
                <span>
                  <img
                    src="https://m.bunjang.co.kr/pc-static/resource/c5e781f4a76a029355bc.png"
                    alt="지역 아이콘"
                  />
                  전국
                </span>
              </div>
            </div>

            <div className="btnIcon">
              <div>

                <WishBtn btnWish={btnWish} size={20} />

              </div>

              <div>
                <ChatBtn className="btnChat" color="white" size={20} />
              </div>

              <div>
                <button className="btnOrder btnStyle">
                  <span>바로구매</span>
                </button>
              </div>
            </div>
          </div>

        </div>
        <div className="otherProduct">
          <div>
            <p>연관상품</p>
            <span>AD <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICAgIDxwYXRoIGZpbGw9IiM5Qjk5QTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE0IDdjMCAzLjg2LTMuMTQgNy03IDdzLTctMy4xNC03LTcgMy4xNC03IDctNyA3IDMuMTQgNyA3em0tMS40IDBjMC0zLjA4OC0yLjUxMi01LjYtNS42LTUuNi0zLjA4OCAwLTUuNiAyLjUxMi01LjYgNS42IDAgMy4wODggMi41MTIgNS42IDUuNiA1LjYgMy4wODggMCA1LjYtMi41MTIgNS42LTUuNnpNOC40IDkuOGMwIC4zODctLjMxMy43LS43LjdIN2MtLjM4NyAwLS43LS4zMTMtLjctLjdWN2MtLjM4NyAwLS43LS4zMTMtLjctLjcgMC0uMzg3LjMxMy0uNy43LS43SDdjLjM4NyAwIC43LjMxMy43Ljd2Mi44Yy4zODcgMCAuNy4zMTMuNy43ek02LjIzIDQuMmMwLS40MjUuMzQ1LS43Ny43Ny0uNzcuNDI1IDAgLjc3LjM0NS43Ny43NyAwIC40MjUtLjM0NS43Ny0uNzcuNzctLjQyNSAwLS43Ny0uMzQ1LS43Ny0uNzd6Ii8+Cjwvc3ZnPgo=" alt="" /></span>
          </div>
          <p>{page}/2</p>

        </div>
        {/* 랜덤 상품 5개 */}
        <div className="swiperContainer">
          {/* <SwiperComponent changePage={changePage} view={5} group={5} between={15} pName={true} pagination={false} effect={''} /> */}
        </div>

        {/* 상품 정보(상품 설명/content) */}
        <div className="contentInfo">
          <div className="contentInfoHeader">
            <div><img src="http://127.0.0.1:8000/webImg/blog.png" alt="네이버블로그공유" /></div>
            <div><FaFacebookF /></div>
            <div><FaTwitter /></div>
            <div><img src="http://127.0.0.1:8000/webImg/url.png" alt="URL공유" /></div>
          </div>
        </div>
      </section>


      <section className="detailSecond">
        <div>
          <h3>상품정보</h3>
          <p>{info.content}</p>
          <ul className="infoList">
            <li>
              <p>
                <HiMiniMapPin />
                거래지역
              </p>
              <span>
                전국
              </span>
            </li>
            <li>
              <p>
                <FaBook />
                카테고리
              </p>
              <span>
                구두/로퍼 &#62;
              </span>
            </li>
            <li>
              <p>
                <RiPriceTagFill />
                상품태그
              </p>
              <span>
                #보테가더비
                #보테가베네타더비
              </span>
            </li>
          </ul>
          <h3>비슷한 새 상품 보기</h3>
          <ul className="similarProduct">
            <li>
              <Image className="detailItemImg" url="productImg\image-1700723555581.png" />
              <div>
                <p className="similarProductPrice">235,900원</p>
                <p>
                  나이키 로말레오 4 3XD SE 올검 올흰 역도화 스쿼트화 헬스화 크로스핏화 헬스신발
                </p>
                <span>꿈꾸는 직구점・광고</span>
              </div>


            </li>
            <li>
              <Image className="detailItemImg" url="productImg\\image-1700725251398.jpg" />
              <div>
                <p className="similarProductPrice">235,900원</p>
                <p>
                  나이키 로말레오 4 3XD SE 올검 올흰 역도화 스쿼트화 헬스화 크로스핏화 헬스신발
                </p>
                <span>꿈꾸는 직구점・광고</span>
              </div>

            </li>
          </ul>
        </div>
        <div>
          <h3>상점정보</h3>
          <div>

            <div className="userInfo">
              <Image className="profileImg" url="productImg\image-1700723555581.png" />
              <div className="storeName">
                <Link to="#">
                  <p>{info.seller}</p>
                  <ul>
                    <li>상품{info.total_pid_count}</li>
                    <li>팔로워20</li>
                  </ul>
                </Link>

              </div>
            </div>
            <div className="followBtn">
              <Follow className="detailPageFollow" color='rgb(136,136,136)' size={18} />
            </div>
            <ul className="photoList">
              <li>
                <Link to='#'>
                  <Image className="productPhoto" url="productImg\image-1700723555581.png" />
                  <p><span>90,000</span>원</p>
                </Link>
              </li>
              <li>
                <Link to='#'>
                  <Image className="productPhoto" url="productImg\image-1700723555581.png" />
                  <p><span>600,000</span>원</p>
                </Link>
              </li>
              <li>
                <Link to='#'>
                  <Image className="productPhoto" url="productImg\image-1700723555581.png" />
                  <p><span>70,000</span>원</p>
                </Link>
              </li>
              <li>
                <Link to='#'>
                  <Image className="productPhoto" url="productImg\image-1700723555581.png" />
                  <p><span>50,000</span>원</p>
                </Link>
              </li>
              <li>
                <Link to='#'>
                  <Image className="productPhoto" url="productImg\image-1700723555581.png" />
                  <p><span>100,000</span>원</p>
                </Link>
              </li>
              <li>
                <Link to='#'>
                  <Image className="productPhoto" url="productImg\image-1700723555581.png" />
                  <p><span>102,000</span>원</p>
                </Link>
              </li>
            </ul>

            <div className="showMoreSeller">
              <Link to='#'>
                <span>{info.total_pid_count}개</span>
                상품더보기
                <IoIosArrowForward color="rgb(136, 136, 136" />
              </Link>
            </div>

            <div className="btnIcon">
              <div>
                <WishBtn btnWish={btnWish} size={14} />
              </div>
              <div>
                <ChatBtn className="btnChat" color="white" size={14} />
              </div>
            </div>






          </div>
        </div>
      </section>

    </main>
  );
}
