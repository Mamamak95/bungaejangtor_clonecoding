import React, { useEffect, useRef, useState } from "react";
import '../../style/header/headersearch.css';

export default function HeaderSearch(){

let searchRef = useRef(null);
// 검색 리스트 렌더링용 (true이면 보여준다)
const [inputFocus, setInputFocus] = useState(false);

useEffect(() => {
  function handleOutside(e) {
    // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setInputFocus(false);
    }
  }
  document.addEventListener("mousedown", handleOutside);
  return () => {
    document.removeEventListener("mousedown", handleOutside);
  };
}, [searchRef]);

  return(
    <>
      <form className="HeaderSearch" ref={searchRef} onFocus={() => {setInputFocus(true)}}>{/* 헤더메인부분의 검색창을 다루는 컴포넌트 */}
          { inputFocus &&
            <div className="Searchpop" id="searchpop">
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