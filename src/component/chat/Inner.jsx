import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Image from '../common/Image'

export default function Inner({getInfo}){
  const [chatInfo, setChatInfo] = useState([]);
  const [userInfo,setUserInfo]=useState({id:'user1'})

  useEffect(() => {
    axios.post('http://127.0.0.1:8000/chat/list',{id:userInfo.id}).then(res=>{
     setChatInfo(res.data)
    }).catch(err=>console.log(err))

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
                  onClick={()=>{getInfo(v.buyer === userInfo.id ? {crid:v.crid,oppoName:v.sellerName,isBuyer:true} : {crid:v.crid,uid:v.buyer,oppoName:v.buyerName,isBuyer:false})}}
                  key={v.crid}
                >
                  <div className="chatList_inner_chatRoomLink_img">
                    <Image></Image>
                  </div>
                  <div className="chatList_inner_chatRoomLink_contents">
                    <div>{v.buyer === userInfo.id ? v.sellerName : v.buyerName}</div>
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