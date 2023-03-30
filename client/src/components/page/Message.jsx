import React, { useEffect, useState } from 'react'

const Message = ({ socket }) => {

  const [messagesRecieved, setMessagesReceived] = useState([]);


    useEffect(() => {
        socket.on('receive_message', (data) => {
          
          setMessagesReceived((state) => [
            ...state,
            {
              message: data.message,
              userName: data.userName,
              __createdtime__: data.__createdtime__,
            },
          ]);
        });


        // return () => socket.off('receive_message')
    }, [socket])


    const timeStamp = (timestamp) => {
        // console.log(timestamp)
        const date = new Date(timestamp)
        return date.toLocaleString()
    }

  return (
    <div>
        <div className='messagesColumn'>
          {messagesRecieved.map((msg, id) =>  (
            <div className='message' key={id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className='msgMeta'>{msg.userName}</span>
              <span className='msgMeta'>
                {timeStamp(msg.__createdtime__)}
              </span>
            </div>
            <p className='msgText'>{msg.message}</p>
            <br />
          </div>
          )
        )}
            
        </div>
    </div>
    
  )
}

export default Message