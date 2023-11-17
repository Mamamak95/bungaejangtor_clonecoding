import React from "react";
import '../logoutpopup.css';

export default function LogoutPopUp(){
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
            <button className="logoutno">취소</button>
            <button className="logoutyes">확인</button>
          </div>
        </div>
      </div>
    </div>
  );
}