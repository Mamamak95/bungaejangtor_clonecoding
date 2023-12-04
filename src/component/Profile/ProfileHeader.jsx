import React from "react";
import '../../style/profile/profileHearder.css'
import { MdOutlineStorefront } from "react-icons/md";
import { RiStoreLine } from "react-icons/ri";
import { CiStar } from "react-icons/ci";

export default function ProfileHeader(){
  return(
<div className="inner">
      <div class="ph_haerder">
        <div class="ph_haerder_leftbox">
          <div class="gray-box">
            <ul>
              <li className="store"><MdOutlineStorefront /></li>
              <li>상점82307748호</li>
              <li className="stars"><CiStar/><CiStar/><CiStar/><CiStar/><CiStar/></li>
              <li><button>내상점 관리</button></li>
            </ul>
          </div>
        </div>
        <div class="pr_haerder_rightbox">
          <div class="white_box">
            <div className="first_box">
              <h4>상점82307748호</h4>
              <div>
                <button>상점명 수정</button>
              </div>
              <div>
                <p>ok</p>
                <p>본인인증 완료</p>
              </div>
            </div>
            <div className="second_box">
              <div>
                <p><RiStoreLine/></p>
                <p>상점오프일 13일전</p>
              </div>
              <div>
                <p><RiStoreLine/></p>
                <p>상점방문수 0명</p>
              </div>
              <div>
                <p><RiStoreLine/></p>
                <p>상품판매 0회</p>
              </div>
              <div>
                <p><RiStoreLine/></p>
                <p>택배발송 0회</p>
              </div>
            </div>
            <div className="third_box">
              <button>소개글 수정</button>
            </div>
          </div>
        </div>
      </div>
</div>
  )
}