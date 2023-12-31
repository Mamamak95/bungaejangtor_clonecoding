import React, { useEffect, useState, useRef } from "react";
import formatRelativeDate from "../../util/date.js";
import ProductList from "../Product/ProductList.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function ChatRoom({ user, roomInfo, chatLog, handleKey }) {
  const chatBox = useRef(null);
  const [purchase, setPerchase] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const scroll = window.scrollTop;
    async function scrollTo() {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
    scrollTo();
    window.scrollTop = scroll;
  }, [chatLog]);

  const handlePurchase = (crid, e) => {
    setPerchase(true);
  };

  const confirmPurchase = () => {
    axios
      .post(`http://192.168.50.57:8000/purchase`, {
        pid: roomInfo.pid,
        buyer: user,
        seller: roomInfo.seller,
      })
      .then((res) =>
        res.data > 0
          ? navigate(`/purchase/${roomInfo.pid}/${user}/${res.data}`)
          : res.data == -1
          ? alert("이미 구매가 완료된 상품입니다.")
          : alert("다시 시도해주세요")
      );
  };

  return (
    <div className="chatList_right">
      <div className={purchase ? "purchaseModal active" : "purchaseModal"}>
        <div>
          <div>구매하시겠습니까?</div>
          <div>
            <button
              onClick={() => {
                confirmPurchase();
              }}
            >
              구매
            </button>
            <button
              onClick={() => {
                setPerchase(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
      <div className="chatRoom_header">
        <span>{roomInfo.oppoName}</span>
      </div>
      {roomInfo.crid ? (
        <div className="purchase">
          <Link to={`/productDetail/${roomInfo.pid}`}>
            <ProductList
              image={roomInfo.productImg}
              name={roomInfo.pname}
              price={roomInfo.price}
            ></ProductList>
          </Link>
          {roomInfo.sellStatus == "sell" ? (
            <button style={{ cursor: "default" }}>판매완료</button>
          ) : roomInfo.seller != user ? (
            <button
              onClick={() => {
                handlePurchase(roomInfo.crid);
              }}
            >
              구매하기
            </button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <ul className="chatLog" ref={chatBox}>
        {roomInfo.crid ? (
          chatLog.map((s, i) => {
            return (
              <li
                className={`${
                  user != s.sender ? "oppo" : "me" //!(사용자가 구매자? XOR 구매자가 보냄?)
                } chat_message`}
                key={i}
              >
                {!s.isRead && s.sender == user ? (
                  <div className="readMark">안읽음</div>
                ) : (
                  <></>
                )}
                <span>{s.content}</span>
                <div>{formatRelativeDate(s.date)}</div>
              </li>
            );
          })
        ) : (
          <>
            <li>
              <div className="empty-chat">
                <img src="http://192.168.50.57:8000/webImg/empty_chat.svg" alt="" />
                <span>대화방을 선택해주세요.</span>
              </div>
            </li>
          </>
        )}
      </ul>

      {roomInfo.crid ? (
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
              fillRule="evenodd"
            ></path>
          </svg>

          <textarea
            cols="30"
            rows="2"
            maxLength={100}
            onKeyDown={handleKey}
            ref={(input) => input && input.focus()}
          ></textarea>

          <button></button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}
