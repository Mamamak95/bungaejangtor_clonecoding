import React from "react";
import '../../style/footer/footer.css';
import { Link } from "react-router-dom";

export default function Footer(){
  return(
    <div className="footer">
      <div className="footerTop">
        <nav className="footerMenu inner">
          <Link to = "https://bgzt.co.kr/" target="_blank">회사소개</Link>
          <Link to = "https://terms.bunjang.co.kr/terms/service.html" target="_blank">이용약관</Link>
          <Link to = "https://terms.bunjang.co.kr/terms/service-policy.html" target="_blank">운영정책</Link>
          <Link to = "https://terms.bunjang.co.kr/terms/privacy.html" target="_blank">개인정보처리방침</Link>
          <Link to = "https://terms.bunjang.co.kr/terms/youth-policy.html" target="_blank">청소년보호정책</Link>
          <Link to = "https://ads-partner.bunjang.co.kr/" target="_blank">광고제휴</Link>
        </nav>
      </div>

      <div className="footerMainContents inner">
        <div className="address">
          <div className="bungaeInfo">
            <p className="title">번개장터(주) 사업자정보</p>
            <div className="addrContents">
              <p>대표이사 : 최재화, 강승현   &nbsp; | &nbsp;  개인정보보호책임자 : 박병성</p>
              <p>사업자등록번호 : 113-86-45836   &nbsp; | &nbsp;  통신판매업신고 : 2019-서울서초-1126</p>
              <p>호스팅서비스 제공자 : Amazon Web Services (AWS)</p>
              <p>EMAIL : help@bunjang.co.kr   &nbsp; |  &nbsp;  FAX : 02-598-8241</p>
              <p>주소 : 서울특별시 서초구 서초대로 38길 12, 7, 10층(서초동, 마제스타시티, 힐스테이트 서리풀)</p>
            </div>
            <Link to = 'https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1138645836' target="_blank" className="businessCheck">사업자정보 확인</Link>
          </div>
          <div className="pointInfo">
            <div className="hundaiPoint">
              <p><b>번개장터(주)더현대서울점</b>   &nbsp; | &nbsp; 최재화, 강승현   &nbsp; | &nbsp;   365-85-01581</p>
              <p>서울특별시 영등포구 여의대로 108, 지하2층(여의도동, 파크원)</p>
            </div>
            <div className="coexPoint">
              <p><b>번개장터(주)코엑스점</b>   &nbsp; | &nbsp;  최재화, 강승현  &nbsp; | &nbsp;  142-85-27412</p>
              <p>서울특별시 강남구 영동대로 513, 쇼핑몰동 B1층 C102호(삼성동, 코엑스)</p>
            </div>
            <div className="centerPoint">
              <p><b>번개장터(주)센터필드점</b>  &nbsp; | &nbsp;  최재화, 강승현  &nbsp; | &nbsp;  808-85-01905</p>
              <p>서울특별시 강남구 테헤란로 231, 쇼핑몰동 1층 W124호(역삼동)(역삼동, 센터필드)</p>
            </div>
          </div>
        </div>
      
        <div className="customer">
          <div className="customerInfo">
            <p className="title">고객센터</p>
            <strong>1670-2910</strong>
            <p className="centerTime">운영시간 9시 - 18시 (주말/공휴일 휴무, 점심시간 12시 - 13시)</p>
            <Link to = '#' className="notice">공지사항</Link>
            <Link to = '#' className="inq">1:1 문의하기</Link>
            <Link to = '#' className="qna">자주 묻는 질문</Link>
          </div>
          <div className="guide">
            <p className="title">우리은행 채무지급보증 안내</p>
            <div className="guideContent">
              번개장터㈜는 회사가 직접 판매하는 상품에 한하여, 고객님의 현금 결제 금액에 대해 우리은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.
            </div>
            <Link to = 'https://terms.bunjang.co.kr/terms/wooriguarantee.html' target="_blank" className="joinCheck">서비스 가입사실 확인</Link>
            <p className="copyright">&copy; Bungaejangter. Inc All rights reserved.</p>
          </div>
        </div>
      </div>

      <div className="term inner">
        <div className="termContent">
          <Link to = "https://isms.kisa.or.kr/main/ispims/issue/?certificationMode=list&crtfYear=&searchCondition=2&searchKeyword=%EB%B2%88%EA%B0%9C%EC%9E%A5%ED%84%B0+%EC%A3%BC%EC%8B%9D%ED%9A%8C%EC%82%AC&__encrypted=U8oaEwTLg12yqNDZuCwRPMiDRLgcrZjlbxomU5uctoZc1kXWONBhXaf0KhG%2BaV6wpp2zSeTry6yKT1QpQPP4n6Wl4JbzPyTKSn7s1FoRr90UnnwTp%2BW928V1TpyMuwFVMU8D270RkIg564CRAF0bUnkvpnfyAxjhbyn0pSpjvw%2BMlXuoQnR3oJUfvVi%2B1dac8Gnd7jHhSmiDLOX09CuWhVRPx40RuMcaT%2FHbItyyZvQECWvcAvRb36C1zB%2FnwnWRJNfv74iaCKBgpNE%2BERnypNyBfcqQSKf%2BfDsW9aHcpTOO1K747YgBrg%3D%3D" target="_blank" className="termLink">
            <img src="https://m.bunjang.co.kr/pc-static/resource/ee757469a142ab4f2f48.png" alt="termImg" />
            <div className="termWrite">
              <p>[인증범위] 번개장터 중고거래 플랫폼 서비스 운영(심사받지 않은 물리적 인프라 제외)</p>
              <p>[유효기간] 2021.05.18 ~ 2024.05.17</p>
            </div>
          </Link>
        </div>

        <div className="termExplain">
          <div className="explainContent">
            번개장터㈜는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령 및 번개장터㈜의 약관에 따라 상품, 상품정보, 거래에 관한 책임은 개별 판매자에게 귀속하고, 번개장터㈜는 원칙적으로 회원간 거래에 대하여 책임을 지지 않습니다. 다만, 번개장터㈜가 직접 판매하는 상품에 대한 책임은 번개장터㈜에게 귀속합니다.
          </div>
        </div>
      </div>
    </div>
  );
}