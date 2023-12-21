import React, { useEffect, useRef, useState } from "react";
import '../../style/header/headersearch.css';
import { useLocation, useNavigate } from "react-router-dom";
import { FaShop } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";

export default function HeaderSearch(){
  const [inputFocus, setInputFocus] = useState(false); // 검색 리스트 렌더링용 (true이면 보여준다)
  const [closeBtn, setCloseBtn] = useState(false);
  const [searchInput, setSearchInput] = useState({value:''});
  const [searchContent, setSearchContent] = useState(false);
  const [searchContentChange, setSearchContentChange] = useState(false);
  const [searchDelete, setSearchDelete] = useState(false);
  const [searchDelete2, setSearchDelete2] = useState(true);
  const [searchPopCenter, setSearchPopCenter] = useState(true)
  const [searchPopCenter2, setSearchPopCenter2] = useState(false)
  const [searchPopCenterList, setSearchPopCenterList] = useState(false);
  
  
  const navigate = useNavigate();
  const location = useLocation();
  
  let searchRef = useRef(null);
  let searchInputRef = useRef(null);

  const [recentSearches, setRecentSearches] = useState([]);
  const [searchPopChange, setSearchPopChange] = useState(false);
  const [searchPopular, setSearchPopular] = useState([]);
  const [localLength, setLocalLength] = useState([]);
  const [localTarget, setLocalTarget] = useState([]);

  /* 로컬스토리지에 키값을 넣는걸 유즈이펙트로 저장 */
  useEffect(() => {
    const searchData = JSON.parse(localStorage.getItem('searchData')) || [];
    setRecentSearches(searchData);
    
    setRecentSearches((prevSearches) => {
      if (prevSearches.length > 0) {
        setSearchPopCenterList(true);
        setSearchPopCenter(false)
      } else if (prevSearches.length === 0) {
        setSearchPopCenterList(false);
        setSearchPopCenter(true)
      }
      return prevSearches;
    });
  }, [searchPopChange]);
  
  /* 최근검색어가 있으면 온체인지를 주어서 상태가 바뀜 */
  const handleSearchCenter = (e) => {
    if(recentSearches.length > 0){
      setSearchPopCenterList(true)
      setSearchPopCenter(false)
    } else if(recentSearches.length === 0){
      setSearchPopCenterList(false)
      setSearchPopCenter(true)
    } else if(localLength > 0){
      setSearchPopCenterList(true)
      setSearchPopCenter(false)
    } else if(localLength === 0){
      setSearchPopCenterList(false)
      setSearchPopCenter(true)
    }
    
  }

  /* 검색 서브밋 시 로컬스토리지로 키값을 넣고 검색한 페이지로 이동, 단 빈값이나 null 값일때는 리턴하여 실행하지 않음 */
  const handleSearchSubmit = (e) => {
    e.preventDefault()

    setInputFocus(false)

    const searchDataKey = 'searchData';
    const searchData = JSON.parse(localStorage.getItem(searchDataKey)) || [];

    // 검색어 값
    const inputValue = searchInput.value;

    // 검색어가 비어있거나 null이면 더 이상 진행하지 않음
    if (!searchInput.value || searchInput.value === null) {
      return;
    }

    // 중복된 키값이면 더 이상 진행하지 않음
    if (searchData.includes(inputValue)) {
      return;
    }

    const newSearchData = [inputValue, ...searchData.slice(0, 9)];
    localStorage.setItem(searchDataKey, JSON.stringify(newSearchData));

    setSearchPopChange(!searchPopChange)
    setLocalLength(newSearchData.length)
    setLocalTarget(searchData)

    const newUrl = `/search?query=${inputValue}`;
    navigate(newUrl);

    // 특정 경로로 이동한 후에 새로고침
    // window.location.href = newUrl;

    axios
    .post('http://192.168.50.57:8000/search',searchInput)
    .then(data => 
      data.data === 'good'
    )
    .catch(err => console.log(err))
  }

  

  /* 검색창 온포커스때 나타나는 팝업창 안에서 온체인지가 실행되면 바뀌는 요소들 */
  const handleSearchContent = (e) => { // Change
    setSearchContentChange(true);
    setSearchPopCenter(false)
    setSearchDelete2(false)
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

      if(value.length === 0){
        setSearchContent(false)
        setSearchContentChange(false)
      }
    }

    // console.log(searchPopChange);
    // console.log(searchInput.value);
    // console.log(searchPopChange.length);
    // console.log(location.pathname);
    // console.log(recentSearches.length);
  }

  /* 인기검색어 리스트들 중 선택 클릭한 것의 검색페이지로 이동 */
  const handlePopularSearchList = (e) => {
    // console.log(e.target.dataset.list);

    const newUrl = `/search?query=${e.target.dataset.list}`;
      navigate(newUrl);
  }

  /* 최근검색어 리스트들 중 선택 클릭한 것의 검색페이지로 이동 */
  const handleNewSearchList = (e) => {
    // console.log(e.target.dataset.list);

    const newUrl = `/search?query=${e.target.dataset.list}`;
      navigate(newUrl);
  }

  /* 최근검색어의 모든 검색어 삭제 */
  const handleSearchesDelete = (e) => {
    localStorage.removeItem('searchData'); // 'searchData' 키에 해당하는 데이터 삭제
    setSearchPopChange([]); // searchPopChange를 빈 배열로 설정하여 업데이트 강제
    setLocalLength(0); // 로컬 스토리지 데이터 길이 초기화
    setSearchPopCenterList(false); // 검색어가 없으므로 검색 팝업을 중앙에 표시

  }

  /* 최근검색어에서 일정 검색어만을 삭제 */
  const handleSearchDelete = (e) => {
    const clickSearch = e.target.closest('.searchesnewlist').querySelector('.searchnewname').dataset.list;

    // 기존 로컬 스토리지 데이터 가져오기
    const searchData = JSON.parse(localStorage.getItem('searchData')) || [];

    // 클릭된 검색어에 해당하는 키값을 찾아서 제거
    const updatedSearchData = searchData.filter(search => search !== clickSearch);

    // 업데이트된 데이터를 로컬 스토리지에 저장
    localStorage.setItem('searchData', JSON.stringify(updatedSearchData));

    // state 업데이트로 인한 리렌더링
    setSearchPopChange(updatedSearchData);
    setLocalLength(updatedSearchData.length);
    setSearchPopCenterList(updatedSearchData.length === 0);
  }


  const [searchColor, setSearchColor] = useState('active');
  const [searchColor2, setSearchColor2] = useState('');
  
  const handlerecent = (e) => {
    if(recentSearches.length > 0){
      setSearchPopCenter(false)
      setSearchPopCenter2(false)
      setSearchPopCenterList(true)
      setSearchDelete2(true)
    } else if(recentSearches.length === 0){
      setSearchPopCenter(true)
      setSearchPopCenter2(false)
      setSearchPopCenterList(false)
      setSearchDelete2(true)
    }

    setSearchColor('active')
    setSearchColor2('')
  }

  const handlepopular = (e) => {
    setSearchPopCenter(false)
    setSearchPopCenter2(true)
    setSearchPopCenterList(false)

    setSearchContent(false)
    setSearchDelete2(false)

    setSearchColor2('active')
    setSearchColor('')

    axios
    .get('http://192.168.50.57:8000/search/searchname/popular')
    .then(data => 
      setSearchPopular(data.data)
    )
    .catch(err => console.log(err))
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
                    <div className={`recently ${searchColor}`} onClick={handlerecent}>최근 검색어</div>
                    <div className={`popular ${searchColor2}`} onClick={handlepopular}>인기 검색어</div>
                  </div>
                  <div className="searchcenter" onChange={handleSearchCenter}>
                    { searchPopCenter &&
                      <>
                        <img src="https://m.bunjang.co.kr/pc-static/resource/fb38b8548f0c80b100ad.png" alt="searchcenterImg" className="nonsearchlist"/>
                        <p>최근 검색어가 없습니다.</p>
                      </>
                    }
                    { searchPopCenterList &&
                      <>
                        <ul className="searchallnew">
                        { recentSearches.map((search,i) => 
                            <li className="searchesnewlist" key={i}>
                              <div className="searchnewname" data-list={search} onClick={handleNewSearchList}>{search}</div>
                              <button type="button" onClick={handleSearchDelete}>
                                <img src="https://m.bunjang.co.kr/pc-static/resource/8221ab3198c73f8141a4.png" alt="searchCloseBtn" />
                              </button>
                            </li>
                          )
                        }
                        </ul>
                      </>
                    }

                    {
                      searchPopCenter2 &&
                      <>
                        <ul className="searchpopular">
                        { searchPopular.map((popular, i) => 
                            <li key={i} className="searchpopularlist" onClick={handlePopularSearchList} data-list={popular.searchName}>
                              <span>{popular.rno}</span>
                              {popular.searchName}
                            </li>
                          )
                        }
                        </ul>
                      </>
                    }
                  </div>
                </>
              }
              {
                searchContentChange &&
                <>
                  <div className="titlename2">
                    <FaShop className="searchproducticon"/>
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
                { !searchContent && searchDelete2 &&
                  <div className="searchdelete" onClick={handleSearchesDelete}><RiDeleteBin5Line /> 검색어 전체삭제</div> 
                }
                { !searchDelete && !searchDelete2 && <div></div> }
                <div></div>
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
        <button className="searchiconbtn">
          <img src="https://m.bunjang.co.kr/pc-static/resource/2be3c66fa47ccd5ece2a.png" alt="searchImg" />
        </button>
      </form>
    </>
  );
}