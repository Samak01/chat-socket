import React from 'react'
import Message from './page/Message'
import SendMessage from './page/SendMessage'

function Chat({socket, userName, room}) {
  return (
    <div className='chat_feild'>
      <Message socket={socket} userName={userName} room={room}/>
      <SendMessage socket={socket} userName={userName} room={room} />
    </div>
  )
}

export default Chat