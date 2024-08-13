"use client";

import React from 'react';

import { useState } from 'react';

import axios from 'axios';
import LoginForm from "@/components/LoginForm";
import { Console } from 'console';

export default function page() {
  
    
  return (
    <div className='flex justify-center items-center mt-20'>
        <LoginForm />
    </div>
  )
}
