import React, { useEffect, useState } from 'react'
import '../styles/Chat.css';


function Chat({socket,username,room}) {

  const [currentMessage, setCurrentmessage]=useState("");
  const [messages,setMessages]=useState([]);
  
 const sendMessage=async()=>{
   if(currentMessage!==""){
    const messageData={
      room:room,
      author:username,
      message:currentMessage,
      timestamp:
       new Date(Date.now()).getHours()+
      ":"+
      new Date(Date.now()).getMinutes(),
    };
    await socket.emit('send_message',messageData);
    setMessages((messages)=>[...messages,messageData]);
   }
 }

 useEffect(()=>{
   socket.on('receive_message',(data)=>{
     setMessages((messages)=>[...messages,data]);
   })
 },[socket])

  return (
    <div className='chat-container '>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        <div className='chat-messages'>
          {messages.map((message,index)=>{
            return(
              <div key={index} className='chat-message'id={username=== message.author? "you":"author"} >
                <div className='message-content'>
                  <p>{message.message}</p>
                </div>
                <div className='message-meta'>
                  <p>{message.timestamp}</p>
                  <p>{message.author}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='chat-footer'>
        <input 
        type='text'
         placeholder='Type a message' 
         onChange={(event) =>{
           setCurrentmessage(event.target.value)
         }}
         />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
