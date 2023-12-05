import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import ChatRoom from "./ChatRoom";
import * as localStorage from "../../util/localStorage.js";
import Image from "../common/Image.jsx";
import io from "socket.io-client";

//소켓 서버연결 주소
const socket = io("http://127.0.0.1:8000/");

export default function Inner() {
  const user = localStorage.getUser().uid;

  const [userChats, setUserChats] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const [chatLog, setChatLog] = useState([]);

  //소켓 연결 시작, 채팅방 목록 요청
  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/chat/list", { id: user })
      .then((res) => {
        setUserChats(res.data);
        socket.emit("connect-room", { uid: user });
      })
      .catch((err) => console.log(err));
  }, []);

  /**
   * @param {object} info buyer,buyerImg,buyerName,crid,lastestMessage,seller,sellerImg,sellerName
   *
   */
  const handleChatRoom = (info) => {
    console.log(info)
    setRoomInfo({...info});
    axios
      .post("http://127.0.0.1:8000/chat/refresh", { crid: info.crid })
      .then((res) => {
        setChatLog(
          res.data.map((c) => (c.receiver == user ? { ...c, isRead: true } : c))
        );
        socket.emit("read-message", {
          receiver: user,
          crid: info.crid,
          sender: info.buyer == user ? info.seller : info.buyer,
        });
      });
  };

  /* 읽었는지 체크
     
      채팅로그 불러올때 하지않는 이유는 
      네트워크 오류로
      채팅을 요청하고 못봤는데 본거로 체크된 상황보다는 
      봤는데 안봤다고 체크된게 나은 상황이라 판단하기 때문
 */
  useEffect(() => {
    console.log("roominfo");
    if (roomInfo.crid) {
      axios.post("http://127.0.0.1:8000/chat/read", {
        crid: roomInfo.crid,
        uid: user,
      });
    }
  }, [roomInfo]);
  const handleReceive=(crid)=>{
    console.log('check',roomInfo)
    axios
          .post("http://127.0.0.1:8000/chat/list", { id: user })
          .then((res) => {
            setUserChats(res.data);
          })
          .catch((err) => console.log(err));
        if (roomInfo.crid == crid) {
          axios
            .post("http://127.0.0.1:8000/chat/refresh", { crid: roomInfo.crid })
            .then((res) => {
              setChatLog(res.data);
            });
          axios.post("http://127.0.0.1:8000/chat/read", {
            crid: roomInfo.crid,
            uid: user,
          });
        }
  }
  useEffect(() => {
    //채팅방 실시간 읽음 확인
    socket.on("read-message", (receiver,crid) => {
      if (roomInfo.crid === crid)
        setChatLog(
          chatLog.map((c) =>
            c.receiver == receiver ? { ...c, isRead: true } : c
          )
        );
    });

    //채팅방 실시간 새로고침
    socket.on("received-message", (received, crid) => {
      console.log(crid,'crid')
      if (received) {
        handleReceive(crid)
      }
    });
  },[]);
  //채팅보내기
  const handleKey = (e) => {
    if (e.key === "Enter" && e.target.value != "") {
      e.preventDefault();
      const message = {
        crid: roomInfo.crid,
        sender: user,
        receiver: roomInfo.buyer == user ? roomInfo.seller : roomInfo.buyer,
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
                <li onClick={() => handleChatRoom(v)} key={v.crid}>
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
        chatLog={chatLog}
      ></ChatRoom>
    </section>
  );
}
