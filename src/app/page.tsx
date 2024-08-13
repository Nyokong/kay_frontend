"use client";
// import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}



export default function Home() {
  // Step 1: Create state to hold user data
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        setUsers(data); // Step 3: Store data in state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

    // call the function 
  
  return (
    <main className="flex flex-col items-center p-24">
      <Link href="/Login">
        Login here
      </Link>
      <div>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
