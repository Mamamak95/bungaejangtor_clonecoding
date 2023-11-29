import React, { useRef, useState } from "react";
import '../../style/popup/loginpopup.css';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import * as Cookie from '../../util/cookie.js';
import { jwtDecode } from "jwt-decode";

export default function LoginPopUp(prop){
  const navigate = useNavigate();
  const [ipToggle, setIpToggle] = useState({});
  const [loginForm, setLoginForm] = useState({uid : "", pw : ""});

  /* 아이디, 비밀번호 검사 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({...loginForm, [name] : value})
  }

  const inputUid = useRef(null);
  const inputPw = useRef(null);

  /* 로그인하기 */
  const handleSubmit = (e) => {
    e.preventDefault();

    // 밸류 체크
    if(loginForm.uid === ''){
      alert('아이디를 입력해주세요.')
      return inputUid.current.focus();
    }
    if(loginForm.pw === ''){
      alert('비밀번호를 입력해주세요.')
      return inputPw.current.focus();
    }

    // 서버 연동
    axios
    .post('http://localhost:8000/login', loginForm)
    .then(data => {
      if(data.data.login){
        alert('로그인 성공')

        Cookie.setCookie('x-auth_token', data.data.token)

        const userInfo = jwtDecode(data.data.token)

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // 상품구매쿠키 보유 시 해당페이지로 이동
        const sellProductCookie = Cookie.getCookie('sellproductcookie')
        if(sellProductCookie === undefined){
          prop.handleLoginToggle()
          navigate('/')
        } else {
          prop.handleLoginToggle()
          navigate(sellProductCookie)
        }

      } else if(data.data.cnt === 1){
        alert('비밀번호가 다릅니다. 다시 확인해주세요.')
        setLoginForm({...loginForm, pw : ''})
        return inputPw.current.focus()
      } else {
        alert('존재하지 않은 아이디 입니다. 다시 확인해주세요.')
        setLoginForm({...loginForm, uid : '', pw : ''})
        return inputUid.current.focus()
      }
    })
    .catch(err => console.log(err))
  }

  /* 비밀번호 보안 ON/OFF */
  const [isShowPwChecked, setShowPwChecked] = useState(false)

  const handleIpToggle = async(e) => {
    setIpToggle(!ipToggle);

    /* 비밀번호 보안 ON/OFF */
    const password = inputPw.current
    if (password === null) return

    setShowPwChecked(!isShowPwChecked)
    if(!isShowPwChecked) {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  }
  let styleIpBtnMove = {
    left : ipToggle ? "0" : "calc(100% - 20px)"
  } // <div className={`downloadqr ${downloadqr && 'off'}`}>
  let styleIpBtnColor = {
    backgroundColor : ipToggle ? "red" : "orange"
  }

  /* 회원가입 페이지 이동 및 로그인팝업창 닫기 */
  const handleSignPageMove = (e) => {
    prop.handleLoginToggle()
    navigate('/sign')
  }

  return(
    <>
      <div className="loginpopupwrap" style={prop.styleLoginBlock} onClick={prop.handleLoginToggle} ></div>

      <div className="loginpopup" style={prop.styleLoginBlock} >
        <div className="loginwrap">
          <div className="closeBtn">
            <button type="button" onClick={prop.handleLoginToggle}><img src="source/closebtn.png" alt="closeBtnImg" /></button>
          </div>
          <div className="loginContent">
            <div className="logintitle">
              <img src="source/loginicon.png"/>
              <p>번개장터</p>
            </div>
            <form className="loginForm" onSubmit={handleSubmit}>
              <p>
                <i class="fa-regular fa-user"></i>
                <input type="text" placeholder="아이디" ref={inputUid} name="uid" value={loginForm.uid} onChange={handleChange}></input>
              </p>
              <p>
                <i class="fa-solid fa-lock"></i>
                <input type="password" placeholder="비밀번호" ref={inputPw} name="pw" value={loginForm.pw} onChange={handleChange}></input>
              </p>
  
              <p className="loginContent">
                <div className="loginstate">
                  <i className="fa-regular fa-circle-check"></i>
                  <div className="loginstay">로그인 상태 유지</div>
                </div>
                <div className="ipsecurity">
                  <span className="ipsecu">PW보안</span>
                  <span className="ipBtn" onClick={handleIpToggle} style = {styleIpBtnColor}>
                    <div style = {styleIpBtnMove}>&nbsp;</div>
                  </span>
                </div>
              </p>
  
              <div className="loginSignBtns">
                <button className="loginBtn">로그인</button>
                <button type="button" className="signBtn" onClick={handleSignPageMove}>회원가입</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}