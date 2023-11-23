import React from "react";
import { Link } from "react-router-dom";
import '../../style/profile/profilenav.css'

export default function ProfileNavbar(){
  return(
    <div>
      <nav className="profile_navs">
          <Link to='/profile' className="profile_nav">상품</Link>
          <Link to='/profile' className="profile_nav">상점후기</Link>
          <Link to='/profile' className="profile_nav">찜</Link>
          <Link to='/profile' className="profile_nav">팔로잉</Link>
          <Link to='/profile' className="profile_nav">팔로워</Link>
      </nav>
    </div>
  )
}