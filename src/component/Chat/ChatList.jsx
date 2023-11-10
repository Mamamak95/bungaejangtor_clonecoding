import React, { useState } from "react";
import '../../style/chat/chat.css'
import ChatRoom from "./ChatRoom";
import Inner from "./Inner";

export default function ChatList() {
  const [chatRoomId, setChatRoomId] = useState([]);
  function getId(id){
    setChatRoomId(id)
  }
  return (
    <article className="chatList">
      <Inner getId={getId}></Inner>
      <ChatRoom roomId={chatRoomId}></ChatRoom>
    </article>
  );
}
