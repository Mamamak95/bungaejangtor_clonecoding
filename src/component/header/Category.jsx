import React, { useEffect, useRef, useState } from "react";
import '../../style/header/Category.css';
import axios from "axios";

export default function Category(prop){
  const [arrow, setArrow] = useState(false);
  const [middleArrow, setMiddleArrow] = useState(false);
  const [middleWrap, setMiddleWrap] = useState(false);
  const [middle, setMiddle] = useState([]);
  const [middleName, setMiddleName] = useState('');

  const [mainCategory, setMainCategory] = useState([])
  useEffect(() => {
    axios
    .get('data/mainCategory.json')
    .then(data => {
      setMainCategory(data.data)
    })
    .catch(error => {
      console.error('에러 상태 코드:', error.data);
    });
  },[])

  const listRef = useRef(null)
  const mainNameRef = useRef(null)

  const handleEnterMainList = async(e) => {
    setArrow(true)
    setMiddleWrap(true)
    e.currentTarget.style.color = 'white'
    e.currentTarget.style.backgroundColor = 'red'

    // console.log(e.currentTarget.dataset.main);

    let mainName = e.currentTarget.dataset.value;
    let mainNameKor = e.currentTarget.dataset.main;

    // console.log(mainNameKor);

    setMiddleName(mainNameKor)

    await axios
    .get(`data/middle/${mainName}.json`)
    .then(data => 
      setMiddle(data.data)
    )
    .catch(error => {
      console.error('에러 상태 코드:', error.data);
    });

  }

  const handleLeaveMainList = (e) => {
    setArrow(false)
    e.currentTarget.style.color = 'inherit'
    e.currentTarget.style.backgroundColor = 'inherit'
  }
  
  const handleEnterMiddleList = (e) => {
    setMiddleArrow(true)
    e.currentTarget.style.color = 'white'
    e.currentTarget.style.backgroundColor = 'red'
  }

  const handleLeaveMiddleList = (e) => {
    setMiddleArrow(false)
    e.currentTarget.style.color = 'inherit'
    e.currentTarget.style.backgroundColor = 'inherit'
  }


  return(
    <>
      <div className="Category">
        <div className="maincategoryname">
          <div className="categoryname">전체 카테고리
            { arrow &&
              <i class="fa-solid fa-angle-right categoryarrow"></i>
            }
          </div>
          <ul className="maincategorylist">
            { mainCategory &&
              mainCategory.map((list) => 
                <li className="categorylist" 
                  onMouseEnter={handleEnterMainList} 
                  onMouseLeave={handleLeaveMainList}
                  data-value={list.value}
                  data-main={list.main}
                  ref={listRef}>
                  <p ref={mainNameRef} >{list.main}</p>
                </li>
              )
            }
          </ul>

          { middleWrap &&
            <div className="middlecategoryname">
              <div className="middlename">{middleName}
              { middleArrow &&
              <i class="fa-solid fa-angle-right categoryarrow"></i>
              }
              </div>
              <ul className="middlecategorylist">
              { middle &&
                middle.map((mlist) => 
                  <li className="middlelist" 
                    onMouseEnter={handleEnterMiddleList}
                    onMouseLeave={handleLeaveMiddleList}
                  >
                    <p>{mlist.middle}</p>
                  </li>
                )
              }
              </ul>
            </div>
          }
        </div>
      </div>
    </>
  );
}