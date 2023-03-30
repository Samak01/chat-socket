import React from 'react'
import '../index.css'
import { useNavigate } from 'react-router-dom'

const Home = ({ userName, setUserName, room, setRoom, socket }) => {
    const navigate = useNavigate()
    const joinRoom = () => {
      if (room !== '' && userName !== '') {
        socket.emit('join_room', { userName, room });
        navigate('/chat', {replace: true})
      }
    };

    return (
        <div className='container'>
          <div className='formContainer'>
            <h1>Вход</h1>
            <input 
                className='input'
                placeholder='Username...'
                onChange={(e) => setUserName(e.target.value)} />
    
            <select className='input' onChange={(e) => setRoom(e.target.value)}>
              <option>-- Select Room --</option>
              <option value='javascript'>JavaScript</option>
              <option value='node'>Node</option>
              <option value='express'>Express</option>
              <option value='react'>React</option>
            </select>
    
            <button className='btn btn-secondary' onClick={joinRoom} >Войти</button>
          </div>
        </div>
      );
}

export default Home