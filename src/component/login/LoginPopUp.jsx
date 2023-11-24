import React, { useRef, useState } from "react";
import '../../style/popup/loginpopup.css';
import '../../App.css';
import { useNavigate } from "react-router-dom";

export default function LoginPopUp(prop){
  const navigate = useNavigate();
  const [ipToggle, setIpToggle] = useState({});

  /* 비밀번호 보안 ON/OFF */
  const [isShowPwChecked, setShowPwChecked] = useState(false)
  const passwordRef = useRef(null)

  const handleIpToggle = async(e) => {
    setIpToggle(!ipToggle);

    /* 비밀번호 보안 ON/OFF */
    const password = passwordRef.current
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
            <form className="loginForm">
              <p>
                <i class="fa-regular fa-user"></i>
                <input type="text" placeholder="아이디"></input>
              </p>
              <p>
                <i class="fa-solid fa-lock"></i>
                <input type="password" placeholder="비밀번호" ref={passwordRef}></input>
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
                <button type="button" className="loginBtn">로그인</button>
                <button type="button" className="signBtn" onClick={handleSignPageMove}>회원가입</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}