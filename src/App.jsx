import { useState } from 'react';
import './App.css'

import io from 'socket.io-client';
import Chat from './componets/Chat';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [showchat,setShowchat]=useState(false);

  const joinRoom=()=>{
    if(username!==""&&room!==""){
      socket.emit('join_room',room);
      setShowchat(true);
    }
  }
  return (
    <div className='app-container'>

     {!showchat?
      
      (<div className='form-container'> 
      <h3>Join A Chat</h3>
      <input 
      type="text"
       placeholder='John..'
       onChange={(event)=>{
         setUsername(event.target.value)
       }}
       />
      <input
       type="text"
        placeholder='Room ID'
        onChange={(event)=>{
          setRoom(event.target.value)
        }}
        />
      <button onClick={joinRoom}>Join A Room</button>
      
     </div>)
      
    :( <Chat socket={socket} username={username} room={room} />)}
    </div>
  );
}

export default App
