import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');
export default function App() {
const sendMessage =()=>{
  socket.emit()
}
  
  return (
    <main>
     <input placeholder='Message'/>
      <button onClick={sendMessage}>Send message</button>
    </main>
  )
}
