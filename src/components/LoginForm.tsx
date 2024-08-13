'use client';

import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// importing axios
import { useState } from 'react';
import axios from 'axios';

interface Props {
    onSubmit: string;
    e: string;
  }

const Login = ({ onSubmit }: any) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: any) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault(); // Prevent the default form submission (which would be a GET request)

        const data = {
            username: e.target.username.value,
            password: e.target.password.value
          };
    
        console.log('Sending data:', data);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    data
                ),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Received Response:' , result);
              } else {
                console.error('Error:', response.statusText);
              }
          } catch (error) {
            console.error('Error sending data:', error);
          }
      };
  return (
    <form onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center'
    >
        <Label>Login Here:</Label>
        <Input placeholder='Username' 
            className='m-8'
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            />
        <Input placeholder='password' className='m-8'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            />
        <Button 
            type='submit'
        >
            Login
        </Button>
    </form>
  )
}

export default Login