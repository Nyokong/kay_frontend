import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Message {
    message: string;
  }

const MessagesPrint: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        // Fetch messages from the API
        axios.get('http://localhost:8000/api/feedback/msgs')
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setMessages(response.data);
                    console.log(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            })
            .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default MessagesPrint;