import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import ChatRoom from "./ChatRoom";
import * as localStorage from "../../util/localStorage.js";
import * as sessionStorage from "../../util/sessionStorage.js"
import Image from "../common/Image.jsx";
import io from "socket.io-client";

//소켓 서버연결 주소
const socket = io("http://127.0.0.1:8000/");

export default function Inner() {
  const user = localStorage.getUser()?localStorage.getUser().uid:sessionStorage.getUserSession.uid;

  const [userChats, setUserChats] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const [chatLog, setChatLog] = useState([]);

  const [detList, setDetList] = useState([]);
  const [detLog, setDetLog] = useState([]);

  const [socketRead, setSocketRead] = useState({});
  const [socketReceive, setSocketReceive] = useState({});

  //채팅방목록 불러오기
  const getUserChats = () => {
    return axios
      .post("http://127.0.0.1:8000/chat/list", { id: user })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  };
  //채팅로그 불러오기
  const getLog = (crid) => {
    return axios
      .post("http://127.0.0.1:8000/chat/refresh", { crid: crid })
      .then((res) => res.data);
  };

  //소켓 연결 시작, 채팅방 목록 요청
  useEffect(() => {
    async function getList() {
      let list = await getUserChats();
      setDetList(list);
      socket.emit("connect-room", { uid: user });
      //채팅방 실시간 읽음 신호 수신
      socket.on("read-message", (receiver, crid) => {
        setSocketRead({ receiver: receiver, crid: crid });
      });
      //채팅방 실시간 새로고침 신호 수신
      socket.on("received-message", (crid) => {
        setSocketReceive({ crid });
      });
    }
    getList();
  }, []);

  //불러온 목록 넣기
  useEffect(() => {
    setUserChats(detList);
  }, [detList]);

  //불러온 로그 넣기

  useEffect(() => {
    setChatLog(detLog);
  }, [detLog]);

  /** 채팅로그 요청
   * @param {object} info buyer,buyerImg,buyerName,crid,lastestMessage,seller,sellerImg,sellerName,cnt
   *
   */
  const handleChatRoom = (info) => {
    setRoomInfo({
      ...info,
      oppoName: user == info.buyer ? info.sellerName : info.buyerName,
    });
  };
  //채팅방 선택시
  useEffect(() => {
    async function getChatLog() {
      let list = await getLog(roomInfo.crid);
      setDetLog(list);
    }
    if (roomInfo.crid) {
      console.log(roomInfo.crid);
      getChatLog();
      setDetList(
        userChats.map((v) => (v.crid == roomInfo.crid ? { ...v, cnt: 0 } : v))
      );
      socket.emit("read-message", {
        receiver: user,
        crid: roomInfo.crid,
        sender: roomInfo.buyer == user ? roomInfo.seller : roomInfo.buyer,
      });
    }
  }, [roomInfo]);

  //메세지 받을때
  useEffect(() => {
    async function getList(isRead) {
      let list = await getUserChats();
      if(isRead)setDetList(
        list.map((v) => (v.crid == roomInfo.crid ? { ...v, cnt: 0 } : v))
      );
      else setDetList(list);
    }
    async function getChatLog() {
      let list = await getLog(socketReceive.crid);
      socket.emit("read-message", {
        receiver: user,
        crid: roomInfo.crid,
        sender: roomInfo.buyer == user ? roomInfo.seller : roomInfo.buyer,
      });
      setDetLog(list);
    }
    if (roomInfo.crid && roomInfo.crid == socketReceive.crid) {
      getChatLog();
      getList(true);

    }
    else getList(false)
  }, [socketReceive]);

  //메세지 읽을때
  useEffect(() => {
    async function getChatLog() {
      let list = await getLog(socketRead.crid);
      setDetLog(list);
    }
    if (roomInfo.crid && roomInfo.crid == socketRead.crid) {
      getChatLog();
    }
  }, [socketRead]);

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
                    <span>{v.buyer === user ? v.sellerName : v.buyerName}</span>
                    <span>{v.lastestMessage}</span>
                  </div>
                  <Image url={v.productImg} className={'chatList_inner_pimg'}></Image>
                  {v.cnt ? (
                    <div
                      className={
                        v.cnt < 10 ? "notReadCnt" : "notReadCnt cntOverTen"
                      }
                    >
                      {v.cnt < 10 ? v.cnt : "10+"}
                    </div>
                  ) : (
                    <></>
                  )}
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
