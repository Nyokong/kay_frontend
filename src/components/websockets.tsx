'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Message {
    message: string;
  }

export default function WebSocket() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/feedback/msgs')
      .then(response => {
        setMessages(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

//   const sendMessage = () => {
//     const socket = new WebSocket('ws://localhost:8000/ws/somepath/');
//     socket.onopen = () => {
//       socket.send(JSON.stringify({ message: input }));
//       setInput('');
//     };
//   };

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {/* <button onClick={sendMessage}>Send</button> */}
    </div>
  );
}