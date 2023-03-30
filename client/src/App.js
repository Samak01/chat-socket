import React, { useState } from 'react'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import io from 'socket.io-client'
import Chat from './components/Chat'

const socket = io.connect('http://localhost:4000/')

const App = () => {
  const [ userName, setUserName ] = useState('');
  const [ room, setRoom ] = useState('');

  return (
    
      <div>
        <Routes>
          <Route  path='/' element={ 
            <Home
              userName={userName}
              setUserName={setUserName}
              room={room}
              setRoom={setRoom}
              socket={socket}
            /> }/>
          <Route 
              path='/chat'
              element={ <Chat 
                    userName={userName}
                    room={room}
                    socket={socket}
          />}
            />
        </Routes>
      </div>

   
  )
}

export default App