import React from "react";
import '../../style/popup/downloadqr.css';

export default function DownloadQR(prop){

  return(
    <>
      <div className="downloadwrap" onClick={()=> prop.qrToggleBtn(false)}></div>
      <div className="downloadqr">
        <div className="downloadqrwrap">
          <div className="closeBtn">
            <button type="button" onClick={()=> prop.qrToggleBtn(false)}><img src="http://127.0.0.1:8000/webImg/closebtn.png" alt="closeBtnImg" /></button>
          </div>
          <div className="downloadContent">
            <div className="downloadtitle">
              <img src="http://127.0.0.1:8000/webImg//downqr.png"/>
              <p>모바일 기기 인증이 필요합니다</p>
            </div>
            <div className="downloaddes">
              <p>앱에 로그인하면 자동으로</p>
              <p>모바일 기기 인증이 완료됩니다.</p>
            </div>
            <div className="downloadqrImg">
              <img src="http://127.0.0.1:8000/webImg//qrcode.png" alt="qrImg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}