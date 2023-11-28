import React from "react";
import '../../loginpopup.css';
import '../../App.css';

export default function LoginPopUp(){
  return(
    <div className="loginpopup">
      <div className="loginwrap">
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
              <input type="text" placeholder="비밀번호"></input>
            </p>

            <p className="loginContent">
              <div className="loginstate">
                <i className="fa-regular fa-circle-check"></i>
                <div className="loginstay">로그인 상태 유지</div>
              </div>
              <div className="ipsecurity">
                <span className="ipsecu">IP보안</span>
                <span className="ipBtn">
                  <div>&nbsp;</div>
                </span>
              </div>
            </p>

            <button className="loginBtn">로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
}