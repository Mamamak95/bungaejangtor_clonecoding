import React from "react";

export default function ChatRoom() {
  return (
    <div className="chatRoom">
      <div className="chatLog">
        <div className="oppo">aaaa</div>
        <div className="me">bbbb</div>
        <div className="oppo">ccccc</div>
        <div className="oppo">ccccc</div>
        <div className="me">dddddddddddddddddddddddddddddddddddddddd</div>
      </div>
      <div className="chatSend">
        <input type="text" />
        <button>전송</button>
      </div>
    </div>
  );
}
