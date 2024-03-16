import './Chat.scss'
import axios from 'axios'
import ChatRoom from '../../components/ChatRoom/ChatRoom'
import { useEffect, useState } from 'react'

function Chat() {

  return (
    <div className='Chat'>
      <ChatRoom/>
    </div>
  )
}

export default Chat