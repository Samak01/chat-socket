import React, { useState } from 'react'

const  SendMessage = ({ socket, userName, room}) => {

    const [ message, setMessage ] = useState('')

    const sendMessage = () => {
        if(message !== '') {
            const __createdtime__ = new Date();
            socket.emit('send_message', { message, room, userName, __createdtime__});
            setMessage('')
        }
    }
  return (
    <div>
        <div className='sendMessageContainer'>
            <input
                className='messageInput'
                placeholder='Сообщение...'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button className='btn btn-primary' onClick={sendMessage}>
                    Отправить
            </button>
        </div>
    </div>
  )
}

export default SendMessage