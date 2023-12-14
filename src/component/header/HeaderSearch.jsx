import React, { useEffect, useRef, useState } from "react";
import '../../style/header/headersearch.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function HeaderSearch(){
  const [inputFocus, setInputFocus] = useState(false); // 검색 리스트 렌더링용 (true이면 보여준다)
  const [closeBtn, setCloseBtn] = useState(false);
  const [searchInput, setSearchInput] = useState({value:''});
  const [searchContent, setSearchContent] = useState(false);
  const [searchContentChange, setSearchContentChange] = useState(false);
  const [searchDelete, setSearchDelete] = useState(false);
  const [searchPopCenter, setSearchPopCenter] = useState(true)
  
  const navigate = useNavigate();
  const location = useLocation();
  
  let searchRef = useRef(null);
  let searchInputRef = useRef(null);

  const [recentSearches, setRecentSearches] = useState([]);
  const [searchPopChange, setSearchPopChange] = useState([]);
  const [localLength, setLocalLength] = useState([]);

  useEffect(() => {
    const searchData = JSON.parse(localStorage.getItem('searchData')) || [];
    setRecentSearches(searchData);
    
    setRecentSearches((prevSearches) => {
      if (prevSearches.length > 0) {
        setSearchPopCenter(false);
      } else if (prevSearches.length === 0) {
        setSearchPopCenter(true);
      }
      return prevSearches;
    });
  }, [searchPopChange]);
  

  const handleSearchCenter = (e) => {
    if(recentSearches.length > 0){
      setSearchPopCenter(false)
    } else if(recentSearches.length === 0){
      setSearchPopCenter(true)
    } else if(localLength > 0){
      setSearchPopCenter(false)
    } else if(localLength === 0){
      setSearchPopCenter(true)
    }
    
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    setInputFocus(false)

    const searchDataKey = 'searchData';

    const searchData = JSON.parse(localStorage.getItem(searchDataKey)) || [];
    const newSearchData = [searchInput.value, ...searchData.slice(0, 9)];
    localStorage.setItem(searchDataKey, JSON.stringify(newSearchData));
    setSearchPopChange(newSearchData)
    setLocalLength(newSearchData.length)

    if(searchInput.value === ''){
      return;
    } else {
      const newUrl = `/search?query=${searchInput.value}`;
      navigate(newUrl);

      // 특정 경로로 이동한 후에 새로고침
      // window.location.href = newUrl;
    }

  }

  /* 검색창 온포커스때 나타나는 팝업창 안에서 온체인지가 실행되면 바뀌는 요소들 */
  const handleSearchContent = (e) => { // Change
    setSearchContent(false);
    setSearchContentChange(true);
    
    localLength === 0 ? setSearchContentChange(false) : setSearchContentChange(true)
  }

  /* 검색창 온포커스하여 나타난 팝업창과 검색창들 외 것들을 클릭해야 팝업창이 닫히게함 */
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

  /* 검색창에 입력한 값이 있을때 X 이미지의 버튼이 돋보기옆에 생성 */
  useEffect(() => {
    if (searchInput.value !== '') {
      setCloseBtn(true);
    } else {
      setCloseBtn(false);
    }
  }, [searchInput.value]);

  /* 생성된 X 이미지의 버튼을 클릭 시 입력했던 검색창의 검색어 값이 초기화되며 X 버튼도 함께 사라짐 */
  const handleSearchValueDelete = (e) => {
    setCloseBtn(false)
    setSearchInput({value:''})
    setSearchContent(false)
    setSearchContentChange(false)
    searchInputRef.current.focus();
  }

  /* 서버주소가 search 가 아니면 열린 팝업창이 닫히며 입력한 검색어를 초기화 시킴 */
  useEffect(() => {
    if(location.pathname === `/search`){
      setSearchInput((searchInputRef.current.value))
    } else {
      setSearchInput({value:''})
      setSearchContentChange(false)
      setSearchContent(false)
    }
  }, [location.pathname])

  /* 열린 검색 팝업창에 오른쪽 맨하단에 위치한 팝업창 닫기 버튼으로 해당 버튼 클릭 시 팝업창 닫힘 */
  const handleSearchClose = (e) => {
    setInputFocus(!inputFocus)
  }

  /* 검색창에 입력한 검색어의 길이 조절과 온체인지의 변화가 있으면 열린 팝업창 안에서 변화를 줌 */
  const handleChangeSearch = (e) => {
    const { value } = e.target;

    if(value.length < 26){
      setSearchInput({...searchInput, value})

      setSearchContent(true)
      setSearchContentChange(true)

      if(e.target.value === ''){
        setSearchContent(false)
        setSearchContentChange(false)
      }
      
    }
    // console.log(searchPopChange.length);
    // console.log(location.pathname);
    // console.log(recentSearches.length);
  }

  const handleNewSearchList = (e) => {
    // console.log(e.target.dataset.list);

    const newUrl = `/search?query=${e.target.dataset.list}`;
      navigate(newUrl);
  }

  const handleSearchesDelete = (e) => {
    localStorage.removeItem('searchData'); // 'searchData' 키에 해당하는 데이터 삭제
    setSearchPopChange([]); // searchPopChange를 빈 배열로 설정하여 업데이트 강제
    setLocalLength(0); // 로컬 스토리지 데이터 길이 초기화
    setSearchPopCenter(true); // 검색어가 없으므로 검색 팝업을 중앙에 표시
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
                  <div className="searchcenter" onChange={handleSearchCenter}>
                    { searchPopCenter ?
                      <>
                        <img src="https://m.bunjang.co.kr/pc-static/resource/fb38b8548f0c80b100ad.png" alt="searchcenterImg" />
                        <p>최근 검색어가 없습니다.</p>
                      </>
                      :
                      <ul>
                      { recentSearches.map((search) => 
                          <li data-list={search} onClick={handleNewSearchList}>{search}</li>
                        )
                      }
                      </ul>
                    }
                  </div>
                </>
              }
              {
                searchContentChange &&
                <>
                  <div className="titlename2">
                    <i class="fa-solid fa-shop searchproducticon"></i>
                    <div className="recently2">상품검색 &gt; </div>
                    <span>{searchInput.value}</span>
                    <div className="popular2"> 상품명으로 검색</div>
                  </div>
                  <div className="searchcenter2">
                    <p>{searchInput.value}</p>
                  </div>
                </>
              }
              </div>
              <div className="searchfooter">
                { !searchDelete && !searchContent && 
                  <div className="searchdelete" onClick={handleSearchesDelete}><i class="fa-solid fa-trash-can"></i> 검색어 전체삭제</div> }
                { !searchDelete && <div></div> }
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