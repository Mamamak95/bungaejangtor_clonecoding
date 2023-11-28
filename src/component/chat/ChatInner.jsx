import React,{useEffect,useState} from 'react'
import axios from 'axios';
import ChatRoom from './ChatRoom';


export default function Inner(){
  const [chatInfo, setChatInfo] = useState([]);
  const [chatRoomInfo, setChatRoomInfo] = useState({});
  
  useEffect(() => {
    axios.post('http://127.0.0.1:8000/chat/list',{id:'user1'}).then(res=>{
     setChatInfo(res.data)
    }).catch(err=>console.log(err))

  }, []);

  return(
    <section className="chatList">
      <div className='chatList_left'>
        <div className='chatList_header'><span>설정</span></div>
        <div className='chatList_inner'>
          <div className="chatList_inner_listType"><span className='chatList_inner_listType_type'>전체 대화</span></div>
          <ul className='chatList_inner_roomList'>
              {chatInfo.map((v) => {
                return (
                  <li
                    onClick={()=>{setChatRoomInfo(v.buyer === "user1" ? {crid:v.crid,oppoName:v.sellerName,isBuyer:true} : {crid:v.crid,uid:v.buyer,oppoName:v.buyerName,isBuyer:false})}}
                    key={v.crid}
                  >
                    <div className="chatList_inner_chatRoomLink_img">
                      <img
                        src="http://gangnamstar.co.kr/files/attach/images/119/496/028/5ab093602c1cd1d6c8cae3bd29a391d5.jpg"
                        alt=""
                      />
                    </div>
                    <div className="chatList_inner_chatRoomLink_contents">
                      <div>{v.buyer === "user1" ? v.sellerName : v.buyerName}</div>
                      <div>{v.lastestMessage}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
        </div>
      </div>
      <ChatRoom roomInfo={chatRoomInfo}></ChatRoom>
    </section>
  )
}