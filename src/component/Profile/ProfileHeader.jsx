import React, { useEffect, useRef, useState } from "react";
import '../../style/profile/profileHearder.css'
import { RiStoreLine } from "react-icons/ri";
import { CiStar } from "react-icons/ci";

export default function ProfileHeader({uid, name,regDate,comment}){
  const [isTextareaVisible, setIsTextareaVisible] = useState(false);
  const [isSTextareaVisible, setSTextareaVisible] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment);
  const [updatedName, setUpdatedName] = useState(name);
  const commentTextareaRef = useRef(null); 
  const storenameTextareaRef = useRef(null); 

    /* storename */
    const handleTogglee = () => {
      setSTextareaVisible(true);
    };
  
    const handleSavee = () => {
      setSTextareaVisible(false);
    };

    useEffect(() => {
      if (isSTextareaVisible) {
        storenameTextareaRef.current.focus();
        storenameTextareaRef.current.selectionStart = storenameTextareaRef.current.value.length;
      }
    }, [isSTextareaVisible]);

  /* comment */
  const handleToggle = () => {
    setIsTextareaVisible(!isTextareaVisible);
  };

  const handleSave = () => {
    setIsTextareaVisible(false);
  };

  useEffect(() => {
    if (isTextareaVisible) {
      commentTextareaRef.current.focus();
      commentTextareaRef.current.selectionStart = commentTextareaRef.current.value.length;
    }
  }, [isTextareaVisible]);

  return(
    <div className="inner">
      <div className="pro_header">
        <div className="left_box">
          <img className="inline" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxjaXJjbGUgZmlsbD0iI0ZBRkFGQSIgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIi8+CiAgICAgICAgPHBhdGggZD0iTTM2LjIxNiA0MS42ODNjLjI0OC0xLjkzMS40OTgtMy44NjIuNzUtNS43OTRoNi43OWwtLjI4MyA1LjUzN2MwIC4wMTcuMDA3LjAzNC4wMDcuMDUxLS4wMDIuMDEtLjAwMi4wMi0uMDAyLjAzLS4wOTggMS44NzYtMS44OTcgMy4zOTItNC4wMzUgMy4zOTItMS4wNjYgMC0yLjAxOC0uMzktMi42MTUtMS4wNzItLjUxLS41ODUtLjcyMi0xLjMyNS0uNjEyLTIuMTQ0em04Ljg4OCA0LjA3OGMxLjIyNCAxLjI4OSAzLjAwOSAyLjAyOCA0Ljg5IDIuMDI4IDEuODkgMCAzLjY3NC0uNzQgNC45LTIuMDMzLjEwNy0uMTEyLjIwNy0uMjI4LjMwNC0uMzQ1IDEuMjggMS40NDcgMy4yMTcgMi4zNzggNS4zNSAyLjM3OC4xMTIgMCAuMjE2LS4wMjcuMzI4LS4wMzJWNjMuNkgzOS4xMTVWNDcuNzU3Yy4xMTIuMDA1LjIxNS4wMzIuMzI4LjAzMiAyLjEzMyAwIDQuMDcxLS45MzEgNS4zNTEtMi4zOC4wOTkuMTIxLjIuMjM4LjMxLjM1MnptMS41NDUtOS44NzJoNi42OThsLjI4MiA1LjYxOWMwIC4wMTUtLjAwNy4wMjctLjAwNy4wNGwuMDA0LjA4NmEyLjkzOSAyLjkzOSAwIDAgMS0uODI2IDIuMTMyYy0xLjM2NyAxLjQ0LTQuMjMzIDEuNDQxLTUuNjA0LjAwM2EyLjk1IDIuOTUgMCAwIDEtLjgzLTIuMTQybC4wMDQtLjA3OGMwLS4wMTYtLjAwOC0uMDMtLjAwOC0uMDQ4bC4yODctNS42MTJ6bTE2LjM3NiAwYy4yNTIgMS45MzMuNTAyIDMuODY1Ljc1MyA1LjgwNC4xMDkuODEtLjEwNCAxLjU0Ny0uNjE0IDIuMTMyLS41OTYuNjgzLTEuNTUgMS4wNzQtMi42MTYgMS4wNzQtMi4xMzcgMC0zLjkzMi0xLjUxNC00LjAzNC0zLjM4OGEuMzU5LjM1OSAwIDAgMC0uMDAzLS4wNDRjMC0uMDE1LjAwNi0uMDI3LjAwNi0uMDRsLS4yNzgtNS41MzhoNi43ODZ6TTM2LjIyNiA0Ni45NDZ2MTguMDk4YzAgLjc5OC42NDYgMS40NDUgMS40NDQgMS40NDVoMjQuNjVjLjc5OSAwIDEuNDQ1LS42NDcgMS40NDUtMS40NDVWNDYuOTQ2Yy41OS0uMzI4IDEuMTM3LS43MTkgMS41NzUtMS4yMiAxLjA2MS0xLjIxNCAxLjUyMi0yLjc4NSAxLjMwMS00LjQxLS4zLTIuMzU1LS42MDctNC43MDctLjkxOC03LjA2YTEuNDQzIDEuNDQzIDAgMCAwLTEuNDMxLTEuMjU3SDM1LjY5OWMtLjcyNCAwLTEuMzM4LjUzOC0xLjQzMSAxLjI1Ny0uMzExIDIuMzU0LS42MTcgNC43MDctLjkxNiA3LjA1LS4yMjEgMS42MzcuMjQgMy4yMDggMS4zIDQuNDIxLjQzOS41MDIuOTg0Ljg5MyAxLjU3NCAxLjIyeiIgZmlsbD0iI0NDQyIvPgogICAgPC9nPgo8L3N2Zz4K" alt="" />
          <p className="store">{name}</p>
          <div><CiStar className="inline"/><CiStar className="inline"/><CiStar className="inline"/><CiStar className="inline"/><CiStar className="inline"/></div>
          <div style={{clear:'both'}}></div>
          <button className="store_but">내 상점 관리</button>
        </div>

        <div className="right_box">

          <div className="first">
            <div className="float_left">
            <div className="inline float_left storename">
              {!isSTextareaVisible ? (
                <p className="inline store">{name}</p>
              ) : (
                <textarea
                  className="name_textarea"
                  ref={storenameTextareaRef}
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                ></textarea>
              )}
            </div>
            {!isSTextareaVisible && (
              <button className="sbox float_left" onClick={handleTogglee}>
                상점명 수정
              </button>
            )}
            {isSTextareaVisible && (
              <button className="sbox float_left savebut" onClick={handleSavee}>
                저장
              </button>
            )}
            </div>
            <div className="float_right">
              <p className="inline ok"> ok</p>
              <p className="inline">본인인증 완료</p>  
            </div>
          </div>

          <div className="second">
              <div className="smallfont">
                <p className="inline float_left"><RiStoreLine/></p>
                <p className="inline ">상점오프일 {regDate}</p>
              </div>
              <div className="smallfont">
                <p className="inline float_left"><RiStoreLine/></p>
                <p className="inline">상점방문수 0명</p>
              </div>
              <div className="smallfont">
                <p className="inline float_left"><RiStoreLine/></p>
                <p className="inline">상품판매 0회</p>
              </div >
              <div className="smallfont">
                <p className="inline float_left"><RiStoreLine/></p>
                <p className="inline">택배발송 0회</p>
              </div>
          </div>

          <div className="third">
            <div className="commet">
              {!isTextareaVisible ? (
                <p>{comment}</p>
              ) : (
                <textarea
                  className="commet_textarea"
                  ref={commentTextareaRef}
                  value={updatedComment}
                  onChange={(e) => setUpdatedComment(e.target.value)}
                ></textarea>
              )}
            </div>
            {!isTextareaVisible && (
              <button className="sbox float_left" onClick={handleToggle}>
                소개글 수정
              </button>
            )}
            {isTextareaVisible && (
              <button className="sbox float_left" onClick={handleSave}>
                저장
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}