import React from 'react'
import ChatList from './ChatList'
import ChatRoom from './ChatRoom'
import './style/chat/chat.css'

export default function Chat(){

  return(
    <article className='chat'>
      <ChatList></ChatList>
      <ChatRoom></ChatRoom>
      <div></div>
    </article>
  )
}