import React from "react";
import styled from 'styled-components';
import '../downloadqr.css';

export default function DownloadQR(){

  return(
    <div className="downloadqr">
      <div className="downloadqrwrap">
        <div className="closeBtn">
          <button><img src="source/closebtn.png" alt="closeBtnImg" /></button>
        </div>
        <div className="downloadContent">
          <div className="downloadtitle">
            <img src="source/downqr.png"/>
            <p>모바일 기기 인증이 필요합니다</p>
          </div>
          <div className="downloaddes">
            <p>앱에 로그인하면 자동으로</p>
            <p>모바일 기기 인증이 완료됩니다.</p>
          </div>
          <div className="downloadqrImg">
            <img src="source/qrcode.png" alt="qrImg" />
          </div>
        </div>
      </div>
    </div>
  );
}