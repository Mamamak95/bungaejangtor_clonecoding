import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import ChatRoom from "./ChatRoom";
import * as localStorage from "../../util/localStorage.js";
import Image from "../common/Image.jsx";
import io from "socket.io-client";

const socket = io("http://127.0.0.1:8000/");

export default function Inner() {
  const user = localStorage.getUser().uid;

  const [userChats, setUserChats] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const [chatLog, setChatLog] = useState([]);

  /////////////

  /////////////
  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/chat/list", { id: user })
      .then((res) => {
        setUserChats(res.data);
        socket.emit("connect-room", { uid: user })
      })
      .catch((err) => console.log(err));
  }, [chatLog]);

  //채팅방 불러오기
  useLayoutEffect(() => {
    handleLog();
  }, [roomInfo]);

  ///////
  useEffect(() => {
    socket.on("received-message", (received) => {
      if(received) handleLog();
    });
  }, [socket]);

  //채팅 내역 갱신
  const handleLog = () => {
    if (roomInfo.crid != null) {
      axios
        .post(`http://127.0.0.1:8000/chat/log`, { crid: roomInfo.crid })
        .then((res) => {
          setChatLog(res.data);
        });
    }
  };
  //채팅보내기
  const handleKey = (e) => {
    if (e.key === "Enter" && e.target.value != "") {
      e.preventDefault();
      const message = {
        crid: roomInfo.crid,
        sender: user,
        receiver: roomInfo.oppo,
        content: e.target.value,
      };
      e.target.value = "";
      socket.emit("send-message", message);
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
            {userChats.map((v) => {
              return (
                <li
                  onClick={() => {
                    setRoomInfo(
                      v.buyer === user
                        ? {
                            crid: v.crid,
                            uid:v.buyer,
                            oppoName: v.sellerName,
                            oppo: v.seller,
                          }
                        : {
                            crid: v.crid,
                            uid: v.seller,
                            oppoName: v.buyerName,
                            oppo: v.buyer,
                          }
                    );
                  }}
                  key={v.crid}
                >
                  <Image
                    className="chatList_inner_chatRoomLink_img"
                    url={v.buyer === user ? v.sellerImg : v.buyerImg}
                  ></Image>

                  <div className="chatList_inner_chatRoomLink_contents">
                    <div>{v.buyer === user ? v.sellerName : v.buyerName}</div>
                    <div>{v.lastestMessage}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <ChatRoom
        user={user}
        roomInfo={roomInfo}
        handleKey={handleKey}
        handleLog={handleLog}
        chatLog={chatLog}
      ></ChatRoom>
    </section>
  );
}
