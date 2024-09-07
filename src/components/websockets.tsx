'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

// shadcn ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { io } from "socket.io-client";

import { v4 as uuidv4 } from 'uuid';

interface Message {
    messages: string;
}

interface WebSocketFileProps {
  room: string;
  chatId: string;
}

const WebSocketFile: React.FC<WebSocketFileProps> =({ room,chatId }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const sockRef = useRef<WebSocket>(null!); // useRef to store WebSocket instance

  useEffect(() => {
    // Generate a chatId if not present
    // const newChatId = 'feed';
    const chatId = room;

    if (chatId) {
      console.log("chartID is:", room);
      // Initialize WebSocket with generated chatId
      sockRef.current = new WebSocket(`ws://localhost:8000/ws/feedback/${chatId}/`);

      sockRef.current.onopen = () => {
        console.log('Connected to WebSocket server');
        sockRef.current?.send(JSON.stringify({ message: 'Hello Server!' }));
      };

      // Event listener for receiving messages from the server
      sockRef.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        // const message = data.message;
        // setMessages((prevMessages) => [...prevMessages, message]);

        if (data && data.message) {
          const message = data.message; // Ensure this is a string
          setMessages((prevMessages) => [...prevMessages, message ]);
        } else {
          console.error('Received invalid message:', data);
        }
      };

      // Event listener for when the connection is closed
      sockRef.current.onclose = () => {
          console.log('Disconnected from WebSocket server');
      };

      // Event listener for errors
      sockRef.current.onerror = (error) => {
          console.error(`WebSocket error: ${error.message}`);
      };

      return () => {
        if (sockRef.current) {
          sockRef.current.close();
        }
      };
    }

  }, [chatId]); // Only run WebSocket connection effect after chatId is set

  const sendMessage = () => {

    if (sockRef.current?.readyState === WebSocket.OPEN) {
      sockRef.current.send(JSON.stringify({ message: input }));
      setInput(''); // Clear input after sending
    }else {
      console.error('WebSocket connection is not open.');
    }
  };
  


  return (
    <div>
      <h1 className='text-center text-2xl'>Messages</h1>

      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

      <div className='m-10 w-[500px]'>
        <Input 
            placeholder='text' 
            className='m-8'
            type='text'
            name='message'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
      </div>

        <Button onClick={sendMessage}> Send </Button>
    </div>
  );
}

export default WebSocketFile;