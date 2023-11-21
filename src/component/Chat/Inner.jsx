import React,{useEffect,useState} from 'react'

export default function Inner({getId}){
  const [chatInfo, setChatInfo] = useState([]);
  useEffect(() => {
    fetch("./data/chat/chatRoomList.json")
      .then((res) => res.json())
      .then((data) => setChatInfo(data));
  }, []);

  return(
    <div className='chatList_left'>
      <div className='chatList_header'><span>설정</span></div>
      <div className='chatList_inner'>
        <div className="chatList_inner_listType"><span className='chatList_inner_listType_type'>전체 대화</span></div>
        <ul className='chatList_inner_roomList'>
            {chatInfo.map((v) => {
              return (
                <li
                  onClick={()=>{getId(v.buyer === "aaaa" ? [v.crid,v.seller,true] : [v.crid,v.buyer,false])}}
                  key={v.crid}
                >
                  <div className="chatList_inner_chatRoomLink_img">
                    <img
                      src="http://gangnamstar.co.kr/files/attach/images/119/496/028/5ab093602c1cd1d6c8cae3bd29a391d5.jpg"
                      alt=""
                    />
                  </div>
                  <div className="chatList_inner_chatRoomLink_contents">
                    <div>{v.buyer === "aaaa" ? v.seller : v.buyer}</div>
                    <div>{v.lastestMessage}</div>
                  </div>
                </li>
              );
            })}
          </ul>
      </div>
    </div>
  )
}