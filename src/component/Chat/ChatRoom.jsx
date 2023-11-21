import React, { useEffect, useState } from "react";

export default function ChatRoom({ roomId }) {
  const [chatLog, setChatLog] = useState([]);
  useEffect(() => {
    fetch("/data/chat/chatLog.json")
      .then((res) => res.json())
      .then((data) => setChatLog(data));
  }, []);

  const isBuyer = roomId[1] === "";
  return (
    <div className="chatList_right">
      <div className="chatRoom_header">{roomId[1]}상대 이름</div>
      <div className="chatLog">
        {chatLog.map((s) => {
          console.log(roomId, s.isBuyer);
          return (
            <div
              className={`${
                (roomId[2] ^ s.isBuyer) ? "oppo" : "me" //!(사용자가 구매자? XOR 구매자가 보냄?)
              } chat_message`}
            >
              <span>aaaaa</span>
              <div>date</div>
            </div>
          );
        })}
      </div>
      <form className="chatSend">
        <svg
          width="22"
          height="22"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          role="img"
        >
          <path
            d="M10 0a9.947 9.947 0 0 1 7.094 2.945c3.874 3.889 3.874 10.218 0 14.108A9.944 9.944 0 0 1 10 20a9.946 9.946 0 0 1-7.095-2.946c-3.874-3.89-3.874-10.219 0-14.108A9.949 9.949 0 0 1 10 0zm0 1.73a8.096 8.096 0 0 0-5.774 2.406c-3.22 3.233-3.22 8.494 0 11.727A8.1 8.1 0 0 0 10 18.269a8.1 8.1 0 0 0 5.773-2.406c3.22-3.233 3.22-8.494 0-11.727A8.095 8.095 0 0 0 10 1.731zm0 3.558c.503 0 .91.387.91.865v2.98h3.134c.502 0 .91.388.91.866s-.408.866-.91.866H10.91v2.98c0 .478-.407.866-.91.866-.502 0-.91-.388-.91-.866v-2.98H5.956c-.502 0-.91-.388-.91-.866s.408-.865.91-.865H9.09v-2.98c0-.479.408-.866.91-.866z"
            fill="#7f7f7f"
            fill-rule="evenodd"
          ></path>
        </svg>
        <textarea cols="30" rows="2" maxLength={100}></textarea>
        <button type="submit"></button>
      </form>
    </div>
  );
}
