import React from "react";
import "../style/profile/profile.css";
import ProfileHeader from "../component/Profile/ProfileHeader";
import ProfileNavbar from "../component/Profile/ProfileNavbar"


export default function Profile(){
  return(
    <div className="profile">
      <ProfileHeader />
      <ProfileNavbar/>
    </div>
  )
}