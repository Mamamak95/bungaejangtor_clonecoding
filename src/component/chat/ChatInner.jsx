import React, { useEffect, useState,useLayoutEffect } from "react";
import axios from "axios";
import ChatRoom from "./ChatRoom";
import * as localStorage from '../../util/localStorage.js'; 
import Image from "../common/Image.jsx";

export default function Inner() {
  const user = localStorage.getUser().uid;
  
  const [chatInfo, setChatInfo] = useState([]);
  
  const [chatRoomInfo, setChatRoomInfo] = useState({});
  const [chatLog, setChatLog] = useState([]);

  useLayoutEffect(() => {
    axios
      .post("http://127.0.0.1:8000/chat/list", { id: user })
      .then((res) => {
        setChatInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [chatLog]);

  //채팅방 불러오기
  useLayoutEffect(() => {
    handleLog();
  }, [chatRoomInfo]);

  //채팅 내역 갱신
  const handleLog = () => {
    if (chatRoomInfo.crid != null) {
      axios
        .post(`http://127.0.0.1:8000/chat/log`, { crid: chatRoomInfo.crid })
        .then((res) => {
          setChatLog(res.data);
        });
    }
  };

  //채팅보내기
  const handleKey = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      e.target.value = "";
      axios
        .post("http://127.0.0.1:8000/chat/send", {
          crid: chatRoomInfo.crid,
          isBuyerSend: chatRoomInfo.isBuyer,
          content: value,
        })
        .then((res) => {
          setChatLog(res.data);
        });
      //
    }
  };

  return (
    <section className="chatList">
      <div className="chatList_left">
        <div className="chatList_header">
          <span>설정</span>
          <div className="chatList_inner_listType">
            <span className="chatList_inner_listType_type">전체 대화</span>
          </div>
        </div>
        <div className="chatList_inner">
          <ul className="chatList_inner_roomList">
            {chatInfo.map((v) => {
              return (
                <li
                  onClick={() => {
                    setChatRoomInfo(
                      v.buyer === user
                        ? {
                            crid: v.crid,
                            oppoName: v.sellerName,
                            isBuyer: true,
                          }
                        : {
                            crid: v.crid,
                            uid: v.buyer,
                            oppoName: v.buyerName,
                            isBuyer: false,
                          }
                    );
                  }}
                  key={v.crid}
                >
                    <Image className="chatList_inner_chatRoomLink_img" url={v.buyer === user?v.sellerImg:v.buyerImg}></Image>
                    
                  <div className="chatList_inner_chatRoomLink_contents">
                    <div>
                      {v.buyer === user ? v.sellerName : v.buyerName}
                    </div>
                    <div>{v.lastestMessage}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <ChatRoom
        roomInfo={chatRoomInfo}
        handleKey={handleKey}
        handleLog={handleLog}
        chatLog={chatLog}
      ></ChatRoom>
    </section>
  );
}
