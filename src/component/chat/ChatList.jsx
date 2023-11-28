import React, { useState } from "react";
import '../../style/chat/chat.css'
import ChatRoom from "./ChatRoom";
import Inner from "./Inner";

export default function ChatList() {
  const [chatRoomInfo, setChatRoomInfo] = useState({});
  function getInfo(info){
    setChatRoomInfo(info)
  }
  return (
    <article className="chatList">
      <Inner getInfo={getInfo}></Inner>
      <ChatRoom roomInfo={chatRoomInfo}></ChatRoom>
    </article>
  );
}
