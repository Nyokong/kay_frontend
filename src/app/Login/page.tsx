import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Login from "@/components/Login";

export default function page() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('api/user/login', FormData);
            const token = response.data.token;
            // store token into local storage
            localStorage.setItem('token', token);
            // redirect to protected page - after logging in
        } catch (error) {
            // error handling
            console.error(error);
        }
    };
  return (
    <div>
        <Login onSubmit={handleSubmit} />
    </div>
  )
}
