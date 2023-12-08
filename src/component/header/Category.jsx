import React, { useEffect, useRef, useState } from "react";
import '../../style/header/Category.css';
import axios from "axios";

export default function Category(prop){
  const [arrow, setArrow] = useState(false);
  const [middle, setMiddle] = useState([]);

  const [mainCategory, setMainCategory] = useState([])
  useEffect(() => {
    axios
    .get('data/mainCategory.json')
    .then(data => {
      setMainCategory(data.data)
      setMiddle(data.data.value)
    })
    .then(err => console.log(err))
  },[])

  const listRef = useRef(null)
  const mainNameRef = useRef(null)

  const handleEnterList = (e) => {
    setArrow(true)
    e.currentTarget.style.color = 'white'
    e.currentTarget.style.backgroundColor = 'red'

    // console.log(middle);

    // axios
    // .get(`data/middle/${}.json`)
    // .then(data => 
    //   setMiddle(data.data)
    // )
    // .then(err => console.log(err))

  }
  const handleLeaveList = (e) => {
    setArrow(false)
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
            {
              mainCategory.map((list) => 
                <li className="categorylist" 
                  onMouseEnter={handleEnterList} 
                  onMouseLeave={handleLeaveList}
                  value={list.value}
                  ref={listRef}>
                  <p ref={mainNameRef} >{list.main}</p>
                </li>
              )
            }
          </ul>

          <div className="middlecategoryname">
            <p></p>
          </div>
        </div>

        
      </div>
    </>
  );
}