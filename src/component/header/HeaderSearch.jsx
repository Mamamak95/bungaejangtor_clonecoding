import React, { useEffect, useRef, useState } from "react";
import '../../style/header/headersearch.css';
import { useLocation, useNavigate } from "react-router-dom";

export default function HeaderSearch(){
  const [inputFocus, setInputFocus] = useState(false); // 검색 리스트 렌더링용 (true이면 보여준다)
  const [closeBtn, setCloseBtn] = useState(false);
  const [searchInput, setSearchInput] = useState({value:''});
  const [searchContent, setSearchContent] = useState(false);
  const [searchContentChange, setSearchContentChange] = useState(false);
  const [searchDelete, setSearchDelete] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  let searchRef = useRef(null);
  let searchInputRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setInputFocus(false)

    if(searchInput.value.trim() === ''){
      return;
    } else {
      navigate(`/search?query=${searchInput.value}`);
    }

  }

  const handleSearchContent = (e) => { // Change
    setSearchContent(false);
    setSearchContentChange(true);
    setSearchDelete(false);
  }

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

  useEffect(() => {
    if (searchInput.value !== '') {
      setCloseBtn(true);
    } else {
      setCloseBtn(false);
    }
  }, [searchInput.value]);

  
  useEffect(() => {

    if(location.pathname === `/search`){
      setSearchInput((searchInputRef.current.value))
    } else {
      setSearchInput({value:''})
      setSearchContentChange(false)
      setSearchContent(false)
    }
  }, [location.pathname])

  const handleSearchClose = (e) => {
    setInputFocus(!inputFocus)
  }

  const handleChangeSearch = (e) => {
    const { value } = e.target;
    setSearchInput({...searchInput, value})

    if(value.length < 26){
      setSearchInput({...searchInput, value})

      setSearchContent(true)
      setSearchContentChange(true)

      if(e.target.value === ''){
        setSearchContent(false)
        setSearchContentChange(false)
      }
    }
    
    console.log(location.pathname);
  }

  const handleSearchValueDelete = (e) => {
    setCloseBtn(false)
    setSearchInput({value:''})
    searchInputRef.current.focus();
  }

  return(
    <>
      <form className="HeaderSearch" 
        ref={searchRef} 
        onFocus={() => {setInputFocus(true)}}
        onSubmit={handleSearchSubmit}>
          { inputFocus &&
            <div className="Searchpop" id="searchpop">
              <div className="searchcontent" onChange={handleSearchContent}>
              { !searchContent &&
                <>
                  <div className="titlename">
                    <div className="recently">최근 검색어</div>
                    <div className="popular">인기 검색어</div>
                  </div>
                  <div className="searchcenter">
                    <img src="https://m.bunjang.co.kr/pc-static/resource/fb38b8548f0c80b100ad.png" alt="searchcenterImg" />
                    <p>최근 검색어가 없습니다.</p>
                  </div>
                </>
              }
              {
                searchContentChange &&
                <>
                  <div className="titlename2">
                    <i class="fa-solid fa-shop searchproducticon"></i>
                    <div className="recently2">상품검색 > <span>{searchInput.value}</span></div>
                    <div className="popular2"> 상품명으로 검색</div>
                  </div>
                  <div className="searchcenter2">
                    <p>{searchInput.value}</p>
                  </div>
                </>
              }
              </div>
              <div className="searchfooter">
                { !searchDelete && <div className="searchdelete"><i class="fa-solid fa-trash-can"></i> 검색어 전체삭제</div> }
                { searchDelete && <div></div> }
                <div className="searchclose" onClick={handleSearchClose}>닫기</div>
              </div>
            </div>
          }

        <div className="search">
          <input className="searchinput" 
            value={searchInput.value} 
            ref={searchInputRef} 
            onChange={handleChangeSearch}
            placeholder="상품명,지역명,@상점명 입력" type="text" />
        </div>
        { closeBtn &&
          <button type="button" className="searchCloseBtn" onClick={handleSearchValueDelete}>
            <img src="https://m.bunjang.co.kr/pc-static/resource/8221ab3198c73f8141a4.png" alt="searchCloseBtn" />
          </button>
        }
        <button>
          <img src="https://m.bunjang.co.kr/pc-static/resource/2be3c66fa47ccd5ece2a.png" alt="searchImg" />
        </button>
      </form>
    </>
  );
}