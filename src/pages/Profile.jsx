import React, { useEffect, useState } from "react";
import "../style/profile/profile.css";
import ProfileHeader from "../component/Profile/ProfileHeader";
import ProfileNavbar from "../component/Profile/ProfileNavbar"
import axios from "axios";
import { getUser } from './../util/localStorage';
import formatRelativeDate from './../util/date';


export default function Profile(){
  const [profile, SetProfile] = useState([])
  const userInfo = getUser() ? getUser() : '';

  useEffect(()=>{
    axios
    .get(`http://127.0.0.1:8000/profile/${userInfo.uid}`)
    .then((result)=>
        SetProfile(result.data)
      )
    .catch((err)=>console.log(err))
    }, []);


  return(
    <div className="profile">
      {
        profile.map(a =>
          <div>
            <ProfileHeader
              uid={a.uid}
              name={a.name}
              regDate={formatRelativeDate(a.regDate)}
              comment={a.comment}
            />
            <ProfileNavbar/>
        </div>
      )}
    </div>
  )
}