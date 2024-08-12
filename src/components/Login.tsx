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
  }

const Login = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value
        });
    };
  return (
    <form onSubmit={(e) => onSubmit(e, formData)}>
        <Label>Login Here:</Label>
        <Input placeholder='Username' 
            className='m-8'
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            />
        <Input placeholder='password' className='m-8'
            type='text'
            name='password'
            value={formData.password}
            onChange={handleChange}
            />
        <Button type='submit'>Login</Button>
    </form>
  )
}

export default Login