import React from "react";
import '../../style/popup/logoutpopup.css';
import * as localStorage from '../../util/localStorage.js';
import * as sessionStorage from '../../util/sessionStorage.js'; 
import { useNavigate } from "react-router-dom";

export default function LogoutPopUp(prop){
  const navigate = useNavigate();
  
  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
    localStorage.removeUser();
    sessionStorage.removeUserSession()
    prop.handleLogoutToggle();
    navigate('/');
  }

  return(
    <div className="logoutpopup">
      <div className="logoutwrap">
        <div className="logoutContent">
          <div className="logouttitle">
            로그아웃
          </div>
          <div className="logoutquestion">
            로그아웃 하시겠습니까?
          </div>
          <div className="logoutBtn">
            <button className="logoutno" onClick={()=> prop.handleLogoutToggle(false)}>취소</button>
            <button className="logoutyes" onClick={handleLogout}>확인</button>
          </div>
        </div>
      </div>
    </div>
  );
}