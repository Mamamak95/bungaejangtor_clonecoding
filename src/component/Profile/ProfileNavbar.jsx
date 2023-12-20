import React, { useEffect, useState } from "react";
import '../../style/profile/profilenav.css';
import WishList from './../WishList/WishList';
import Text3 from './Text3';
import Text4 from './Text4';
import { getUser } from "../../util/localStorage";
import axios from "axios";
import { useParams } from "react-router";
import UserItem from './UserItem';
import Text2 from './Text2';

export default function ProfileNavbar() {
  const [activeNav, setActiveNav] = useState("상품");
  const [activeNavf, setActiveNavf] = useState("상품");
  const [info, SetInfo] = useState([]) 
  let { uid } = useParams(); 
  const userInfo = getUser() ? getUser() : '';
  let [list, setList] = useState([])

  const [checkBtn, setCheckBtn] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(10);
  const [pageSize, setPageSize] = useState(4);
  let [sort, setSort] = useState('date');


  useEffect(() => {
    //startIndex , EndIndex
    let startIndex = 0;
    let endIndex = 0;

    startIndex = (currentPage - 1) * pageSize + 1; // startIndex 공삭
    endIndex = currentPage * pageSize; // endIndex 공삭
    axios({
      method: 'get',
      url: `http://localhost:8000/wishList/${userInfo.uid}/${startIndex}/${endIndex}/${sort}`
    })
      .then(res => {
        setTotalCount(res.data[0].totalItemCount)
        res.data = res.data.map(v => ({ ...v, 'check': false }))
        setList(res.data)
      })
      .catch((err) => { console.log(err) });
  }, []);



  const handleNavClick = (nav) => {
    if (nav === "찜한상품") {
      // Set activeNav to "찜" when the link is clicked
      setActiveNav("찜");
      setActiveNavf("찜");
    } else {
      // Handle other navigation clicks as before
      setActiveNav(nav);
      setActiveNavf(nav);
    }
  };

    
  useEffect(()=>{
    axios
    .get(`http://127.0.0.1:8000/profile/${uid}`)
    .then((result)=>
        SetInfo(result.data)
      )
    .catch((err)=>console.log(err))
    }, []);

  return (
    <>
    { userInfo.uid === uid ? (
    <div className="inner">
      <nav className="profile_navs">
            <span
              className={`profile_nav ${activeNav === "상품" ? "active" : ""}`}
              onClick={() => handleNavClick("상품")}
            >
          상품
        </span>

        <span
          className={`profile_nav ${activeNav === "상점후기" ? "active" : ""}`}
          onClick={() => handleNavClick("상점후기")}
        >
          상점후기 0
        </span>

        <span
          className={`profile_nav ${activeNav === "찜" ? "active" : ""}`}
          onClick={() => handleNavClick("찜")}
        >
          찜 {list.length}
        </span>

        <span
          className={`profile_nav ${activeNav === "팔로잉" ? "active" : ""}`}
          onClick={() => handleNavClick("팔로잉")}
        >
          팔로잉 0
        </span>

        <span
          className={`profile_nav ${activeNav === "팔로워" ? "active" : ""}`}
          onClick={() => handleNavClick("팔로워")}
        >
          팔로워
        </span>
      </nav>

      {activeNav === "찜" && <WishList />}
      {activeNav === "상점후기" && <Text2/>}
      {activeNav === "상품" && <UserItem />}
      {activeNav === "팔로잉" && <Text3 />}
      {activeNav === "팔로워" && <Text4 />}
      
    </div>
    ):(
      <div className="inner">
      <nav className="profile_navs">
        <span
          className={`profile_navf ${activeNavf === "상품" ? "active" : ""}`}
          onClick={() => handleNavClick("상품")}
        >
          상품 0
        </span>

        <span
          className={`profile_navf ${activeNavf === "상점후기" ? "active" : ""}`}
          onClick={() => handleNavClick("상점후기")}
        >
          상점후기 0
        </span>


        <span
          className={`profile_navf ${activeNavf === "팔로잉" ? "active" : ""}`}
          onClick={() => handleNavClick("팔로잉")}
        >
          팔로잉 0
        </span>

        <span
          className={`profile_navf ${activeNavf === "팔로워" ? "active" : ""}`}
          onClick={() => handleNavClick("팔로워")}
        >
          팔로워
        </span>
      </nav>

      {activeNavf === "상품" && <UserItem />}
      {activeNav === "상점후기" && <Text2/>}
      {activeNavf === "팔로잉" && <Text3 />}
      {activeNavf === "팔로워" && <Text4 />}
    </div>
    )}
    </>
  );
}
