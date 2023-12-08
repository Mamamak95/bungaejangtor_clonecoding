import React, { useRef, useState } from "react";
import '../../style/header/headersearch.css';

export default function HeaderSearch(){
  /* 검색창 포커싱 */
  const [SearchToggle, setSearchToggle] = useState(false);
  const handleSearch = (e) => {
    setSearchToggle(e);
  }
  
  const handleTrueClick = (e) => {
    setSearchToggle(true)
  }

  return(
    <>
      <form className="HeaderSearch" onFocus={() => {handleSearch(true)}} onBlur={() => {handleSearch(false)}}>{/* 헤더메인부분의 검색창을 다루는 컴포넌트 */}

        { SearchToggle &&
          <div className="Searchpop" onClick={handleTrueClick}>
            <div className="searchcontent">
              <div className="titlename">
                <div className="recently">최근 검색어</div>
                <div className="popular">인기 검색어</div>
              </div>
              <div className="searchcenter">
                <img src="https://m.bunjang.co.kr/pc-static/resource/fb38b8548f0c80b100ad.png" alt="searchcenterImg" />
                <p>최근 검색어가 없습니다.</p>
              </div>
            </div>
            <div className="searchfooter">
              <div className="searchdelete"><i class="fa-solid fa-trash-can"></i> 검색어 전체삭제</div>
              <div className="searchclose">닫기</div>
            </div>
          </div>
        }

        <div className="search">
          <input placeholder="상품명,지역명,@상점명 입력" type="text" />
        </div>
        <button type="button" className="searchCloseBtn"><img src="https://m.bunjang.co.kr/pc-static/resource/8221ab3198c73f8141a4.png" alt="searchCloseBtn" /></button>
        <img src="https://m.bunjang.co.kr/pc-static/resource/2be3c66fa47ccd5ece2a.png" alt="searchImg" />
      </form>
    </>
  );
}