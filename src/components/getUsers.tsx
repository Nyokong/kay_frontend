import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/app/loading';

export default function GetUsers() {
    // Step 1: Create state to hold user data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        // fake a delay
        const timer = setTimeout(() => {
            axios.get('http://127.0.0.1:8000/api/users/')
            .then((response) => {
            setUsers(response.data);
            setLoading(false);
            }).catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
        },2000); // 4 seconds delay

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

 

//   async function getUsers() {
//         // fake a delay
//         await new Promise(resolve => setTimeout(resolve, 3000));

//         const response = await axios.get('http://127.0.0.1:8000/api/users/');
//         // console.log(response.data);
//         setUsers(response.data);
      
//     };
//     const timer = setTimeout(() => {
//         // getUsers();
//       });

      if (loading) {
        return <div><Loading/></div>;
      }

  return (
    <div>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
    </div>
  )
}
