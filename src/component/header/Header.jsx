import React, { useRef, useState } from "react";
import '../../style/header/header.css';
import { Link, useNavigate } from 'react-router-dom';
import DownloadQR from '../popup/DownloadQR';
import LoginPopUp from '../login/LoginPopUp';
import LogoutPopUp from './../login/LogoutPopUp';
import * as localStorage from '../../util/localStorage.js';
import * as sessionStorage from '../../util/sessionStorage.js'; 
import HeaderSearch from "./HeaderSearch.jsx";
import Category from "./Category.jsx";

export default function Header(){
  const navigate = useNavigate();

  const userInfo = localStorage.getUser();
  const userInfoSession = sessionStorage.getUserSession();

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
    userInfo ? navigate(`/products/new/${userInfo.uid}`) : handleLoginToggle();
    // navigate(`/products/new/${userInfoSession.uid}`)
  }
  const naviProduct = (e) => {
    userInfo ? navigate(`/profile`) : handleLoginToggle();
    // userInfoSession ? navigate(`/profile`) : handleLoginToggle();
  }
  const naviChat = (e) => {
    userInfo ? navigate(`/chat`) : handleLoginToggle();
    // userInfoSession ? navigate(`/chat`) : handleLoginToggle();
  }

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
                                                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KICAgIDxtYXNrIGlkPSJtYXNrMF8yMjU3XzYxIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIKICAgICAgICB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPgogICAgICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIgogICAgICAgICAgICBkPSJNMTYgMTEuMDE3NkMxNiAxMS4yMDc4IDE2IDExLjM5OCAxNS45OTg5IDExLjU4ODVDMTUuOTk4IDExLjc0ODcgMTUuOTk2MSAxMS45MDg4IDE1Ljk5MTYgMTIuMDY5QzE1Ljk4MjIgMTIuNDE3NyAxNS45NjEyIDEyLjc3IDE1Ljg5ODUgMTMuMTE0OUMxNS44MzQ5IDEzLjQ2NTIgMTUuNzMxMiAxMy43OTE0IDE1LjU2NjkgMTQuMTA5OEMxNS40MDYgMTQuNDIyNCAxNS4xOTU4IDE0LjcwODUgMTQuOTQ0OCAxNC45NTY2QzE0LjY5MzkgMTUuMjA0NyAxNC40MDQxIDE1LjQxMjggMTQuMDg3OSAxNS41NzE5QzEzLjc2NjEgMTUuNzM0IDEzLjQzNjUgMTUuODM2OCAxMy4wODIxIDE1Ljg5OTdDMTIuNzMzIDE1Ljk2MTcgMTIuMzc2OSAxNS45ODI0IDEyLjAyMzggMTUuOTkxN0MxMS4zNDUxIDE2IDExLjE1MjcgMTYgMTAuOTYwMyAxNkg3LjI1MDE1SDUuMDM5OTdDNC4zMDA0NiAxNS45OTc4IDQuMTM4NDQgMTUuOTk2MSAzLjk3NjQzIDE1Ljk5MTdDMy42MjM0IDE1Ljk4MjQgMy4yNjczMSAxNS45NjE3IDIuOTE4MTkgMTUuODk5N0MyLjU2Mzc3IDE1LjgzNjggMi4yMzQxNiAxNS43MzQgMS45MTIzNyAxNS41NzE5QzEuNTk1ODcgMTUuNDEyOCAxLjMwNjQyIDE1LjIwNDcgMS4wNTU0NiAxNC45NTY2QzAuODA0NDg4IDE0LjcwODUgMC41OTQyMzQgMTQuNDIyNCAwLjQzMzA1NyAxNC4xMDk4QzAuMjY5MDkyIDEzLjc5MTQgMC4xNjUzNTkgMTMuNDY1MiAwLjEwMTUwMiAxMy4xMTQ5QzAuMDM4NzYwNCAxMi43NyAwLjAxODEyNTQgMTIuNDE3NyAwLjAwODY0NDQxIDEyLjA2OUMwLjAwNDE4Mjc4IDExLjkwODggMC4wMDIyMzA4MiAxMS43NDg3IDAuMDAxMzk0MjYgMTEuNTg4NUMwIDExLjM5OCAwIDExLjIwNzggMCAxMS4wMTc2VjguODMyNjZWNy4xNjczNFY0Ljk4MjRDMCA0Ljc5MjE5IDAgNC42MDE3MSAwLjAwMTM5NDI2IDQuNDExNzdDMC4wMDIyMzA4MiA0LjI1MTMzIDAuMDA0MTgyNzggNC4wOTExNyAwLjAwODY0NDQxIDMuOTMxMDFDMC4wMTgxMjU0IDMuNTgyMDEgMC4wMzg3NjA0IDMuMjI5OTkgMC4xMDE1MDIgMi44ODQ4NUMwLjE2NTM1OSAyLjUzNDQ4IDAuMjY5MDkyIDIuMjA4NjQgMC40MzMwNTcgMS44OTAyNUMwLjU5NDIzNCAxLjU3NzM3IDAuODA0NDg4IDEuMjkxMjIgMS4wNTU0NiAxLjA0MzRDMS4zMDY0MiAwLjc5NTAyMyAxLjU5NTg3IDAuNTg3MTcgMS45MTIzNyAwLjQyODExQzIuMjM0MTYgMC4yNjYwMTggMi41NjM3NyAwLjE2MzE5NSAyLjkxODE5IDAuMTAwMzQzQzMuMjY3MzEgMC4wMzgzMTc3IDMuNjIzNCAwLjAxNzY0MjcgMy45NzY0MyAwLjAwODI3QzQuNjU1MTYgMCA0Ljg0NzU2IDAgNS4wMzk5NyAwSDcuMjUwMTVIMTAuODAyNUw4Ljc0OTg1IDAuMDAwODI3TDEwLjk2MDMgMEMxMS42OTk1IDAuMDAyMjA1MzMgMTEuODYxNiAwLjAwMzg1OTMzIDEyLjAyMzggMC4wMDgyN0MxMi4zNzY5IDAuMDE3NjQyNyAxMi43MzMgMC4wMzgzMTc3IDEzLjA4MjEgMC4xMDAzNDNDMTMuNDM2NSAwLjE2MzE5NSAxMy43NjYxIDAuMjY2MDE4IDE0LjA4NzkgMC40MjgxMUMxNC40MDQxIDAuNTg3MTcgMTQuNjkzOSAwLjc5NTAyMyAxNC45NDQ4IDEuMDQzNEMxNS4xOTU4IDEuMjkxMjIgMTUuNDA2IDEuNTc3MzcgMTUuNTY2OSAxLjg5MDI1QzE1LjczMTIgMi4yMDg2NCAxNS44MzQ5IDIuNTM0NDggMTUuODk4NSAyLjg4NDg1QzE1Ljk2MTIgMy4yMjk5OSAxNS45ODIyIDMuNTgyMDEgMTUuOTkxNiAzLjkzMTAxQzE1Ljk5NjEgNC4wOTExNyAxNS45OTggNC4yNTEzMyAxNS45OTg5IDQuNDExNzdDMTYgNC42MDE3MSAxNiA0Ljc5MjE5IDE2IDQuOTgyNFY3LjE2NzM0VjguODMyNjZWMTEuMDE3NloiCiAgICAgICAgICAgIGZpbGw9IndoaXRlIiAvPgogICAgPC9tYXNrPgogICAgPGcgbWFzaz0idXJsKCNtYXNrMF8yMjU3XzYxKSI+CiAgICAgICAgPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjRUYwRTBFIiAvPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgIGQ9Ik0xMi4yNzk3IDcuNTY0NTFIOS4xMDQzNUw5LjYxOTM1IDMuMDc0NTRDOS42MjYzNSAzLjAxMjUgOS41NTIxOCAyLjk3NTY0IDkuNTA2OTMgMy4wMTg1NkwzLjY4NzQ2IDguNTgyODZDMy42NDM2MSA4LjYyNDg0IDMuNjczOTMgOC42OTg1NSAzLjczNDExIDguNjk4MDhMNi44MzAyMSA4LjY2NDk2TDYuMzg2NTcgMTMuMjU5OUM2LjM4MDUxIDEzLjMyMTkgNi40NTQ2OCAxMy4zNTc0IDYuNDk5NDYgMTMuMzE0NUwxMi4zMjU5IDcuNjgwMkMxMi4zNjkzIDcuNjM4NjggMTIuMzM5NSA3LjU2NTQ0IDEyLjI3OTcgNy41NjU0NFY3LjU2NDUxWiIKICAgICAgICAgICAgZmlsbD0iYmxhY2siIC8+CiAgICA8L2c+Cjwvc3ZnPg==" alt="downloadImg" />앱다운로드</button>
              <button type="button" onClick={bookmark}><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDE2IDE1Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggc3Ryb2tlPSIjQ0NDIiBkPSJNLTE2LjUtMTYuNWg0OXY0OWgtNDl6Ii8+CiAgICAgICAgPHBhdGggZmlsbD0iI0U5QjQ1NyIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNOCAwbDIuNSA0LjkzNCA1LjUuNzktNCAzLjg0OC45IDUuNDI4TDggMTIuNDM0IDMuMSAxNSA0IDkuNTcyIDAgNS43MjRsNS41LS43OXoiLz4KICAgIDwvZz4KPC9zdmc+Cg==" alt="bookMarkImg" />즐겨찾기</button>
            </div>

            <div className="HeaderTopMenuRight">{/* 헤더탑의 오른쪽에 위치한 로그인/회원가입, 내상점을 감싸는 태그 */}
              <div className="HeaderLoginSign">{/* 헤더탑의 오른쪽 메뉴에 있는 로그인/회원가입을 다루는 컴포넌트 */}
              { 
                userInfo || userInfoSession ?
                (
                <>
                  <div className="loginuserid">
                    <p>" { userInfo ? userInfo.uid : userInfoSession.uid }님 반갑습니다."</p>
                  </div>
                  <button type="button" onClick={() => { setLogoutToggle(true) }}>로그아웃</button>
                  <div className="alert" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <p>알림</p>
                    <i class="fa-solid fa-caret-down"></i>
                    <div className="alertnot" ref={alertPopup}>
                      <i class="fa-regular fa-bell"></i>
                      <p>최근 알림이 없습니다.</p>
                    </div>
                  </div>
                  <div className="mystore" onMouseEnter={handleStoreMouseEnter} onMouseLeave={handleStoreMouseLeave}>
                    <p>내상점</p>
                    <i class="fa-solid fa-caret-down"></i>
                    <div className="mystorelist" ref={mystorePopup}>
                      <ul>
                        <li onMouseEnter={handleStoreListEnter} onMouseLeave={handleStoreListLeave}>
                          <Link to = '/profile'>내 상품</Link>
                        </li>
                        <li onMouseEnter={handleStoreListEnter} onMouseLeave={handleStoreListLeave}>
                          <Link to = '/profile'>찜한상품</Link>
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
              <Link to = "/"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM2IiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTM2IDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGcgaWQ9InouVEJEIC8gQlgtUmVmcmVzaCAvIGljX2xvZ290eXBlLXB3Ij4KICAgICAgICA8cmVjdCB3aWR0aD0iMTM2IiBoZWlnaHQ9IjQwIiBmaWxsPSJ3aGl0ZSIgLz4KICAgICAgICA8ZyBpZD0iTG9nb3R5cGUgLyBLUiAmIzIzNDsmIzE4MTsmIzE3MzsmIzIzNTsmIzE3MjsmIzE4NDsiPgogICAgICAgICAgICA8cGF0aCBpZD0iVmVjdG9yIgogICAgICAgICAgICAgICAgZD0iTTI1LjM5ODEgMTguNDQ0NUgxNi40MDMyTDE3Ljg2MiA1LjcyNThDMTcuODgxOSA1LjU1MDA1IDE3LjY3MTcgNS40NDU2NiAxNy41NDM2IDUuNTY3MjNMMS4wNTg4NCAyMS4zMjkxQzAuOTM0NjMgMjEuNDQ4MSAxLjAyMDUyIDIxLjY1NjggMS4xOTA5OSAyMS42NTU1TDkuOTYxMjYgMjEuNTYxN0w4LjcwNDU5IDM0LjU3NzdDOC42ODc0MSAzNC43NTM0IDguODk3NTEgMzQuODUzOSA5LjAyNDM3IDM0LjczMjNMMjUuNTI4OSAxOC43NzIyQzI1LjY1MTggMTguNjU0NiAyNS41NjcyIDE4LjQ0NzEgMjUuMzk4MSAxOC40NDcxVjE4LjQ0NDVaIgogICAgICAgICAgICAgICAgZmlsbD0iYmxhY2siIC8+CiAgICAgICAgICAgIDxwYXRoIGlkPSJWZWN0b3JfMiIKICAgICAgICAgICAgICAgIGQ9Ik00OC40MjA4IDI0Ljc4NzRWMTYuODExM0g0NS4xMzU3VjIxLjYxNzRDNDUuMTM1NyAyMS43MDQ2IDQ1LjA2NyAyMS43NzU5IDQ0Ljk3OTggMjEuNzgxMkwzMC43NjUzIDIyLjQ3MUMzMC42NzE1IDIyLjQ3NSAzMC41OTM1IDIyLjQwMSAzMC41OTM1IDIyLjMwNzFWNy4yMzEwNUMzMC41OTM1IDcuMTQxMTkgMzAuNjY2MiA3LjA2NzE5IDMwLjc1NzQgNy4wNjcxOUgzNS4zMDgzQzM1LjM5ODIgNy4wNjcxOSAzNS40NzIyIDcuMTM5ODcgMzUuNDcyMiA3LjIzMTA1VjEwLjg4ODdINDAuMjU3MVY3LjIzMTA1QzQwLjI1NzEgNy4xNDExOSA0MC4zMjk3IDcuMDY3MTkgNDAuNDIwOSA3LjA2NzE5SDQ0Ljk3MTlDNDUuMDYxNyA3LjA2NzE5IDQ1LjEzNTcgNy4xMzk4NyA0NS4xMzU3IDcuMjMxMDVWMTIuMjI3M0g0OC40MjA4VjYuOTU0ODdDNDguNDIwOCA2Ljg2NTAyIDQ4LjQ5MzUgNi43OTEwMiA0OC41ODQ3IDYuNzkxMDJINTMuMTM1NkM1My4yMjU1IDYuNzkxMDIgNTMuMjk5NSA2Ljg2MzY5IDUzLjI5OTUgNi45NTQ4N1YyNC43ODc0QzUzLjI5OTUgMjQuODc3MyA1My4yMjY4IDI0Ljk1MTMgNTMuMTM1NiAyNC45NTEzSDQ4LjU4NDdDNDguNDk0OCAyNC45NTEzIDQ4LjQyMDggMjQuODc4NiA0OC40MjA4IDI0Ljc4NzRaTTM1LjQ3MzUgMTcuNzk4NEw0MC4yNTg0IDE3LjY5NjdWMTQuNzcxMUgzNS40NzM1VjE3Ljc5ODRaIgogICAgICAgICAgICAgICAgZmlsbD0iYmxhY2siIC8+CiAgICAgICAgICAgIDxwYXRoIGlkPSJWZWN0b3JfMyIKICAgICAgICAgICAgICAgIGQ9Ik0zMi44NTQ4IDI0LjgwMDhIMzcuNDYyNkMzNy41NTI0IDI0LjgwMDggMzcuNjI2NCAyNC44NzM1IDM3LjYyNjQgMjQuOTY0NlYyNy45OTQ3TDUzLjEyOCAyNy4zMDQ5QzUzLjIyMDUgMjcuMzAwOSA1My4yOTg1IDI3LjM3NDkgNTMuMjk4NSAyNy40Njg3VjMxLjgzMzRDNTMuMjk4NSAzMS45MjE5IDUzLjIyODUgMzEuOTkzMyA1My4xNDEyIDMxLjk5NzJMMzIuODYxNCAzMi42ODU3QzMyLjc2ODkgMzIuNjg4MyAzMi42OTIzIDMyLjYxNDMgMzIuNjkyMyAzMi41MjE4VjI0Ljk2NDZDMzIuNjkyMyAyNC44NzQ4IDMyLjc2NDkgMjQuODAwOCAzMi44NTYxIDI0LjgwMDhIMzIuODU0OFoiCiAgICAgICAgICAgICAgICBmaWxsPSJibGFjayIgLz4KICAgICAgICAgICAgPHBhdGggaWQ9IlZlY3Rvcl80IgogICAgICAgICAgICAgICAgZD0iTTU1LjY3MzIgMjguNjg1OEw1NS45NTk5IDI4LjI3MjJDNTYuODA3IDI3LjA1NTIgNTcuNjE0MyAyNS43NDMgNTguMzYyMyAyNC4zNzI3QzU5LjExMjggMjIuOTk0NCA1OS43ODY4IDIxLjU3IDYwLjM2ODIgMjAuMTM3NUM2MC45NTc1IDE4LjY4NjYgNjEuNDcyOSAxNy4yMDEzIDYxLjg5NzEgMTUuNzIyN0M2Mi4yNDA2IDE0LjUzMjEgNjIuNTE5NSAxMy4zMzM1IDYyLjcyODIgMTIuMTUzNUw2Mi43Nzg1IDExLjg3Mkg1Ni43Mjc3QzU2LjYzNzggMTEuODcyIDU2LjU2MzggMTEuNzk5NCA1Ni41NjM4IDExLjcwODJWNy42MjIzNUM1Ni41NjM4IDcuNTMyNSA1Ni42MzY1IDcuNDU4NSA1Ni43Mjc3IDcuNDU4NUg2Ny44Nzc4QzY3Ljk3NDMgNy40NTg1IDY4LjA0OTYgNy41NDA0MiA2OC4wNDAzIDcuNjM1NTdMNjguMDEgNy45Nzc4MUM2Ny43OTA2IDEwLjQ3NzkgNjcuNDA4NyAxMi44NDMzIDY2Ljg4MDEgMTUuMDA2NUM2Ni4zNTQyIDE3LjE2NTcgNjUuNzE4NiAxOS4yMDU5IDY0Ljk5NzEgMjEuMDc1N0M2NC4yNzgzIDIyLjk0MDMgNjMuNDcwOSAyNC42OTkxIDYyLjU5NzQgMjYuMzA1OUM2MS43Mjc5IDI3LjkwMjIgNjAuODMwNyAyOS40MDg2IDU5LjkyNjggMzAuNzg2OUw1OS43NTc3IDMxLjA0NDVDNTkuNzA4OCAzMS4xMTg1IDU5LjYwOTcgMzEuMTQxIDU5LjUzNDQgMzEuMDkzNEw1NS42NzA1IDI4LjY4MThWMjguNjg0NUw1NS42NzMyIDI4LjY4NThaIgogICAgICAgICAgICAgICAgZmlsbD0iYmxhY2siIC8+CiAgICAgICAgICAgIDxwYXRoIGlkPSJWZWN0b3JfNSIKICAgICAgICAgICAgICAgIGQ9Ik03NS45NjgyIDMyLjYyODhWMjEuMDIxNEg3NC4xMDVWMzIuNjI4OEM3NC4xMDUgMzIuNzE4NiA3NC4wMzIzIDMyLjc5MjYgNzMuOTQxMSAzMi43OTI2SDY5LjU1NTNDNjkuNDY1NSAzMi43OTI2IDY5LjM5MTUgMzIuNzE5OSA2OS4zOTE1IDMyLjYyODhWNi45NTQ4N0M2OS4zOTE1IDYuODY1MDIgNjkuNDY0MiA2Ljc5MTAyIDY5LjU1NTMgNi43OTEwMkg3My45NDExQzc0LjAzMSA2Ljc5MTAyIDc0LjEwNSA2Ljg2MzY5IDc0LjEwNSA2Ljk1NDg3VjE2LjQzNzRINzUuOTY4MlY2Ljk1NDg3Qzc1Ljk2ODIgNi44NjUwMiA3Ni4wNDA5IDYuNzkxMDIgNzYuMTMyIDYuNzkxMDJIODAuNTcwN0M4MC42NjA2IDYuNzkxMDIgODAuNzM0NiA2Ljg2MzY5IDgwLjczNDYgNi45NTQ4N1YzMi42Mjg4QzgwLjczNDYgMzIuNzE4NiA4MC42NjE5IDMyLjc5MjYgODAuNTcwNyAzMi43OTI2SDc2LjEzMkM3Ni4wNDIyIDMyLjc5MjYgNzUuOTY4MiAzMi43MTk5IDc1Ljk2ODIgMzIuNjI4OFoiCiAgICAgICAgICAgICAgICBmaWxsPSJibGFjayIgLz4KICAgICAgICAgICAgPHBhdGggaWQ9IlZlY3Rvcl82IgogICAgICAgICAgICAgICAgZD0iTTgyLjkyNDMgMTguNTc3NkM4Ny4zMzY2IDE1LjAzNDkgODkuMTg5MiAxMS44ODMzIDg5LjIwNzcgMTEuODQ4OUw4OS40MzM2IDExLjQ4NDJIODQuMjk5OUM4NC4yMTAxIDExLjQ4NDIgODQuMTM2MSAxMS40MTE1IDg0LjEzNjEgMTEuMzIwNFY3LjI4NzM5Qzg0LjEzNjEgNy4xOTc1MyA4NC4yMDg4IDcuMTIzNTQgODQuMjk5OSA3LjEyMzU0SDk5Ljc0NDdDOTkuODM0NiA3LjEyMzU0IDk5LjkwODYgNy4xOTYyMSA5OS45MDg2IDcuMjg3MzlWMTEuMzIxN0M5OS45MDg2IDExLjQxMTUgOTkuODM1OSAxMS40ODU1IDk5Ljc0NDcgMTEuNDg1NUg5NC44OTkxTDk0LjgyOSAxMS42MDg0Qzk0LjU4NDUgMTIuMDQzMiA5NC4zMjQyIDEyLjQ4MzIgOTQuMDUzMyAxMi45MTRMOTMuOTI1MiAxMy4xMjAxTDk5LjkxNTIgMTYuNjU2M0M5OS45OTMxIDE2LjcwMjUgMTAwLjAyIDE2LjgwNDMgOTkuOTcyIDE2Ljg4MjJMOTcuNzE2MyAyMC41ODYyQzk3LjY2ODcgMjAuNjY1NSA5Ny41NjQ0IDIwLjY4OTIgOTcuNDg2NCAyMC42Mzc3TDkxLjQwMTIgMTYuNjFMOTEuMjYyNSAxNi43ODQ0Qzg5LjQ3OTkgMTkuMDMzNSA4Ni44NDUgMjEuMjY4IDg1Ljk1MTcgMjIuMDAyN0M4NS44ODE3IDIyLjA1OTYgODUuNzgxMiAyMi4wNDkgODUuNzIzMSAyMS45Nzg5TDgyLjkyMTcgMTguNTc3Nkg4Mi45MjQzWiIKICAgICAgICAgICAgICAgIGZpbGw9ImJsYWNrIiAvPgogICAgICAgICAgICA8cGF0aCBpZD0iVmVjdG9yXzciCiAgICAgICAgICAgICAgICBkPSJNMTAxLjc3NSAyMC45MTdWNi45NTQ4N0MxMDEuNzc1IDYuODY1MDIgMTAxLjg0NyA2Ljc5MTAyIDEwMS45MzkgNi43OTEwMkgxMDYuMjczQzEwNi4zNjMgNi43OTEwMiAxMDYuNDM3IDYuODYzNjkgMTA2LjQzNyA2Ljk1NDg3VjExLjQ3MDJIMTA5LjgyMUMxMDkuOTExIDExLjQ3MDIgMTA5Ljk4NSAxMS41NDI4IDEwOS45ODUgMTEuNjM0VjE1Ljg5MDNDMTA5Ljk4NSAxNS45ODAyIDEwOS45MTIgMTYuMDU0MiAxMDkuODIxIDE2LjA1NDJIMTA2LjQzN1YyMC45MTdDMTA2LjQzNyAyMS4wMDY5IDEwNi4zNjQgMjEuMDgwOSAxMDYuMjczIDIxLjA4MDlIMTAxLjkzOUMxMDEuODQ5IDIxLjA4MDkgMTAxLjc3NSAyMS4wMDgyIDEwMS43NzUgMjAuOTE3WiIKICAgICAgICAgICAgICAgIGZpbGw9ImJsYWNrIiAvPgogICAgICAgICAgICA8cGF0aCBpZD0iVmVjdG9yXzgiCiAgICAgICAgICAgICAgICBkPSJNMTMwLjEyMyAzMi42Mjg4VjIxLjAyMTRIMTI1LjkxMUMxMjUuODIyIDIxLjAyMTQgMTI1Ljc0OCAyMC45NDg3IDEyNS43NDggMjAuODU3NVYxNi42MDEyQzEyNS43NDggMTYuNTExNCAxMjUuODIgMTYuNDM3NCAxMjUuOTExIDE2LjQzNzRIMTMwLjEyM1Y2Ljk1NDg3QzEzMC4xMjMgNi44NjUwMiAxMzAuMTk2IDYuNzkxMDIgMTMwLjI4NyA2Ljc5MTAySDEzNC44MzhDMTM0LjkyOCA2Ljc5MTAyIDEzNS4wMDIgNi44NjM2OSAxMzUuMDAyIDYuOTU0ODdWMzIuNjI4OEMxMzUuMDAyIDMyLjcxODYgMTM0LjkyOSAzMi43OTI2IDEzNC44MzggMzIuNzkyNkgxMzAuMjg3QzEzMC4xOTcgMzIuNzkyNiAxMzAuMTIzIDMyLjcxOTkgMTMwLjEyMyAzMi42Mjg4WiIKICAgICAgICAgICAgICAgIGZpbGw9ImJsYWNrIiAvPgogICAgICAgICAgICA8cGF0aCBpZD0iVmVjdG9yXzkiCiAgICAgICAgICAgICAgICBkPSJNMTEyLjM0OCA3LjI2NDAySDEyNS42NzlDMTI1Ljc2OSA3LjI2NDAyIDEyNS44NDMgNy4zMzY2OSAxMjUuODQzIDcuNDI3ODdWMTEuNTE3N0MxMjUuODQzIDExLjYwNzUgMTI1Ljc3MSAxMS42ODE1IDEyNS42NzkgMTEuNjgxNUgxMTcuMDYyVjE2LjQzODZIMTIzLjcyNUMxMjMuODE1IDE2LjQzODYgMTIzLjg4OSAxNi41MTEzIDEyMy44ODkgMTYuNjAyNVYyMC44NTg4QzEyMy44ODkgMjAuOTQ4NyAxMjMuODE2IDIxLjAyMjcgMTIzLjcyNSAyMS4wMjI3SDExNy4wNjJWMjYuNjgzNkwxMjguMjQzIDI1LjY4OTlDMTI4LjMzOCAyNS42ODIgMTI4LjQyIDI1Ljc1NzMgMTI4LjQyIDI1Ljg1MjVWMjkuOTA1M0MxMjguNDIgMjkuOTg5OCAxMjguMzU1IDMwLjA1OTkgMTI4LjI3MiAzMC4wNjc4TDExMi4zNjIgMzEuNTc4MkMxMTIuMjY2IDMxLjU4NzQgMTEyLjE4NCAzMS41MTIxIDExMi4xODQgMzEuNDE1NlY3LjQyNjU1QzExMi4xODQgNy4zMzY3IDExMi4yNTYgNy4yNjI3IDExMi4zNDggNy4yNjI3VjcuMjY0MDJaIgogICAgICAgICAgICAgICAgZmlsbD0iYmxhY2siIC8+CiAgICAgICAgICAgIDxwYXRoIGlkPSJWZWN0b3JfMTAiCiAgICAgICAgICAgICAgICBkPSJNOTYuMjEzMSAzMy45NTkzQzg3LjAyNTIgMzMuOTU5MyA4NS42NTIzIDMwLjA3NTYgODUuNjUyMyAyNy43NTkyQzg1LjY1MjMgMjIuNjM0NyA5MS4zOTM5IDIxLjU1OTEgOTYuMjEzMSAyMS41NTkxQzEwMi45MjMgMjEuNTU5MSAxMDYuNzc0IDIzLjgyIDEwNi43NzQgMjcuNzU5MkMxMDYuNzc0IDMwLjA3MyAxMDUuNDAxIDMzLjk1OTMgOTYuMjEzMSAzMy45NTkzWk05Ni4yMTMxIDI1Ljg4NjdDOTMuNTI1MyAyNS44ODY3IDkwLjQ0MTEgMjYuMTAwOCA5MC40NDExIDI3Ljc2NzFDOTAuNDQxMSAyOS4wNDg5IDkyLjI3NTIgMjkuNjQ0OSA5Ni4yMTMxIDI5LjY0NDlDMTAwLjE1MSAyOS42NDQ5IDEwMS45ODUgMjkuMDQ2MyAxMDEuOTg1IDI3Ljc2NzFDMTAxLjk4NSAyNi40ODggMTAwLjA0MyAyNS44ODY3IDk2LjIxMzEgMjUuODg2N1oiCiAgICAgICAgICAgICAgICBmaWxsPSJibGFjayIgLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt="mainLogoImg" /></Link>
              
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
              <i onMouseEnter={() => {handleCategoryMouseEnter(true)}} 
                  onMouseLeave={() => {handleCategoryMouseEnter(false)}}
                  class="fa-solid fa-bars categoryMenu">
                  { CategoryToggle && <Category handleCategoryMouseEnter={handleCategoryMouseEnter}/> }
                  {/* <Category /> */}
              </i>
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