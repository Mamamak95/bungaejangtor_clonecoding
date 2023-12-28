import React, { useRef, useState } from "react";
import '../../style/header/header.css';
import { Link, useNavigate } from 'react-router-dom';
import DownloadQR from '../popup/DownloadQR';
import LoginPopUp from '../login/LoginPopUp';
import LogoutPopUp from './../login/LogoutPopUp';
import HeaderSearch from "./HeaderSearch.jsx";
import Category from "./Category.jsx";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaRegBell } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { getUser } from "../../util/localStorage.js";


export default function Header(){
  const navigate = useNavigate();

  const userInfo = getUser();

  const bookmark = (e) => {
    alert('Ctrl+D 키를 누르면 즐겨찾기에 추가하실 수 있습니다.');
  }

  /* QR코드 다운로드팝업 */
  const [qr, setQr] = useState(false);
  const qrToggleBtn = (e) => {
    setQr(e)
  }

  /* 로그인 팝업 */
  const [loginToggle, setLoginToggle] = useState({});
  const handleLoginToggle = (e) => {
    setLoginToggle(!loginToggle);
  }
  let styleLoginBlock = {
    display : loginToggle ? "none" : "block"
  }

  /* 로그아웃 팝업 */
  const [logoutToggle, setLogoutToggle] = useState(false);
  const handleLogoutToggle = (e) => {
    setLogoutToggle(e);
  }
  
  /* 각 주소로 이동 */
  const naviProductNew = (e) => {
    if (userInfo) {
      if (localStorage.getItem(`saveImg_${userInfo.uid}`) || localStorage.getItem(`saveData_${userInfo.uid}`)) {
        const result = window.confirm('임시저장된 글이 있습니다 이어서 작성하시겠습니까?');
        if (result) {
          navigate(`/products/new/${userInfo.uid}`)
        } else {
          localStorage.removeItem(`saveImg_${userInfo.uid}`);
          localStorage.removeItem(`saveData_${userInfo.uid}`);
          navigate(`/products/new/${userInfo.uid}`)

        }
      } else {
        navigate(`/products/new/${userInfo.uid}`)
      }
    } else {
      handleLoginToggle()
    }
    // navigate(`/products/new/${userInfoSession.uid}`)
  }
  const naviProduct = (e) => {
    userInfo ? navigate(`/profile/${userInfo.uid}`) : handleLoginToggle();
    // userInfoSession ? navigate(`/profile`) : handleLoginToggle();
  }
  const naviChat = (e) => {
    userInfo ? navigate(`/chat`) : handleLoginToggle();
    // userInfoSession ? navigate(`/chat`) : handleLoginToggle();
  }

  /* Link to 함수넣기 동적링크 생성 */
  // const naviMyProfileReturn = (e) => {
  //   return `/profile/${e}`;
  // }
  // const naviMyProfile = naviMyProfileReturn(userUid);

  /* 로그인 후 가시화된 최상단 알림 hover */
  const alertPopup = useRef(null);

  const handleMouseEnter = (e) => {
    alertPopup.current.style.display = 'block';
  }
  const handleMouseLeave = (e) => {
    alertPopup.current.style.display = 'none';
  }

  /* 로그인 후 가시화된 최상단 내상점 hover */
  const mystorePopup = useRef(null);

  const handleStoreMouseEnter = (e) => {
    mystorePopup.current.style.display = 'block';
  }
  const handleStoreMouseLeave = (e) => {
    mystorePopup.current.style.display = 'none';
  }

  const handleStoreListEnter = (e) => {
    e.currentTarget.style.fontWeight = 'bold';
  }
  const handleStoreListLeave = (e) => {
    e.currentTarget.style.fontWeight = 'inherit';
  }

  /* 카테고리 hover */
  const [CategoryToggle, setCategoryToggle] = useState(false);
  const handleCategoryMouseEnter = (e) => {
    setCategoryToggle(!CategoryToggle);
  }
  

  return(
    <>
      <header>{/* 헤더 전체를 덮는 태그 */}
        {/* 헤더 위에 따로 앱다운로드, 즐겨찾기, 로그인/회원가입, 내상점을 감싸는 태그 */}
        <div className="HeaderTop">
          <div className="headerTopWrap inner">
            <div className="HeaderTopMenuLeft">{/* 헤더탑의 왼쪽에 있는 앱다운로드, 즐겨찾기를 감싸는 태그 */}
              <button type="button" onClick={()=> { setQr(true) }}>
                                                <img src="http://192.168.50.57:8000/webImg/download.png" alt="downloadImg" />앱다운로드</button>
              <button type="button" onClick={bookmark}><img src="http://192.168.50.57:8000/webImg/bookmark.svg" alt="bookMarkImg" />즐겨찾기</button>
            </div>

            <div className="HeaderTopMenuRight">{/* 헤더탑의 오른쪽에 위치한 로그인/회원가입, 내상점을 감싸는 태그 */}
              <div className="HeaderLoginSign">{/* 헤더탑의 오른쪽 메뉴에 있는 로그인/회원가입을 다루는 컴포넌트 */}
              { 
                userInfo ?
                (
                <>
                  <div className="loginuserid">
                    <p>" {userInfo.uid}님 반갑습니다."</p>
                  </div>
                  <button type="button" onClick={() => { setLogoutToggle(true) }}>로그아웃</button>
                  <div className="alert" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <p>알림</p>
                    <TiArrowSortedDown />
                    <div className="alertnot" ref={alertPopup}>
                      <div><FaRegBell /></div>
                      <p>최근 알림이 없습니다.</p>
                    </div>
                  </div>
                  <div className="mystore" onMouseEnter={handleStoreMouseEnter} onMouseLeave={handleStoreMouseLeave}>
                    <p>내상점</p>
                    <TiArrowSortedDown />
                    <div className="mystorelist" ref={mystorePopup}>
                      <ul>
                        <li onMouseEnter={handleStoreListEnter} onMouseLeave={handleStoreListLeave}>
                          <Link to = {`/profile/${userInfo.uid}`} >내 상품</Link>
                        </li>
                        <li onMouseEnter={handleStoreListEnter} onMouseLeave={handleStoreListLeave}>
                          <Link to = {`/profile/${userInfo.uid}`}>찜한상품</Link>
                        </li>
                        <li onMouseEnter={handleStoreListEnter} onMouseLeave={handleStoreListLeave}>
                          <Link to = '/profile'>계정설정</Link>
                        </li>
                        <li onMouseEnter={handleStoreListEnter} onMouseLeave={handleStoreListLeave}>
                          <Link to = '/'>고객센터</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
                )
                :
                (
                  <button type="button" onClick={handleLoginToggle}>로그인 / 회원가입</button>
                )
              }
              </div>
            </div>
          </div>
        </div>

        {/* 헤더메인부분 전체를 감싸는 태그 */}
        <div className="HeaderMain">
          <div className="headerMainWrap inner">
            <div className="HeaderContents">{/* 헤더메인부분의 모든 콘텐츠를 감싸는 태그 */}
              <Link to = "/"><img src="http://192.168.50.57:8000/webImg/mainlogo.png" alt="mainLogoImg" /></Link>
              
              <HeaderSearch />

              <div className="HeaderMainMenu">{/* 헤더메인부븐의 오른쪽에 위치한 메뉴들을 감싸는 태그 */}
                <div className="HeaderSell">{/* 헤더메인부분의 오른쪽에 위치한 메뉴들 중 판매하기를 다루는 컴포넌트 */}
                  <button type="button" onClick={naviProductNew}><img src="https://m.bunjang.co.kr/pc-static/resource/bcc7abb5d531bcf26033.png" alt="sellImg" />판매하기</button>
                </div>
                <div className="HeaderMyStore">{/* 헤더탑과 헤더메인콘텐츠에 위치한 내상점을 다루는 컴포넌트 */}
                  <button type="button" onClick={naviProduct} className="mystoreLink"><img src="https://m.bunjang.co.kr/pc-static/resource/31370b164bc5b7cc4fef.png" alt="mystoreImg" />내상점</button>
                </div>
                <div className="HeaderBungaeTalk">{/* 헤더메인부분의 오른쪽에 위치한 메뉴들 중 번개톡을 다루는 컴포넌트 */}
                  <button type="button" className="BungaeTalkBtn" onClick={naviChat}><img src="https://m.bunjang.co.kr/pc-static/resource/32554a59cf002b3def10.png" alt="bungaetalkImg" />번개톡</button>
                </div>
              </div>
            </div>

            <div className="HeaderCategory">{/* 헤더메인부분의 맨 아래쪽 카테고리를 감싸는 태그 */}
              <div className="categoryMenu" onMouseEnter={() => {handleCategoryMouseEnter(true)}}
                  onMouseLeave={() => {handleCategoryMouseEnter(false)}}>
                <HiMenu />
                { CategoryToggle && <Category handleCategoryMouseEnter={handleCategoryMouseEnter}/> }
                {/* <Category /> */}
              </div>
              <Link to = "https://seller.bunjang.co.kr/intro" target="_blank">번개장터 판매자센터</Link>
              <img src="https://m.bunjang.co.kr/pc-static/resource/34a01cb11e0b14957f81.png" className="categoryRight" alt="categoryRightImg" />
            </div>
          </div>
        </div>
        
        { qr && <DownloadQR qrToggleBtn={qrToggleBtn} /> }
        <LoginPopUp styleLoginBlock={styleLoginBlock} handleLoginToggle={handleLoginToggle}/>
        { logoutToggle && <LogoutPopUp handleLogoutToggle={handleLogoutToggle}/> }
      </header>
    </>
  );
}