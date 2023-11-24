import React from "react";
import '../../style/popup/logoutpopup.css';

export default function LogoutPopUp(prop){
  return(
    <div className="logoutpopup" style={prop.styleBlock}>
      <div className="logoutwrap">
        <div className="logoutContent">
          <div className="logouttitle">
            로그아웃
          </div>
          <div className="logoutquestion">
            로그아웃 하시겠습니까?
          </div>
          <div className="logoutBtn">
            <button className="logoutno" onClick={prop.handlePopupToggle}>취소</button>
            <button className="logoutyes">확인</button>
          </div>
        </div>
      </div>
    </div>
  );
}