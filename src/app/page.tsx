"use client";
// import Image from "next/image";    
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { resolve } from 'path';

import { Button } from '@/components/ui/button';

import React, { Suspense } from 'react';
import Loading from './loading';
import GetUsers from '@/components/getUsers';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}

export default function Home() {
  // Step 1: Create state to hold user data
  const [users, setUsers] = useState<User[]>([]);

  async function getUsers() {
        // fake a delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        // console.log(response.data);
        setUsers(response.data);
      
    };

    const [showUsers, setShowUsers] = useState(false);

  const handleButtonClick = () => {
    setShowUsers(true);
  };

  // temp function that gets users from the database
  // (async () => {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:8000/api/users/');
  //     // console.log(response.data);
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // })();
  
  return (
    <main className="flex flex-col items-center p-24">
      <Link href="/Login">
        Login here
      </Link>
      <div>
        <Button className="mt-10" onClick={handleButtonClick}>
            Load users
        </Button>
       
        {showUsers && (
          <Suspense fallback={<Loading />}>
            <GetUsers />
          </Suspense>
        )}
      </div>
    </main>
  );
}
