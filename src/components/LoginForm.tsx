'use client';

import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// importing axios
import { useState, useEffect } from 'react';
// import useHistory  from 'react-dom';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// import for cookies
import Cookies from 'js-cookie';

interface Props {
    onSubmit: string;
    e: string;
    error: any;
  }

const Login = ({ onSubmit }: any) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    
    const [error, setError] = useState('');

    const router = useRouter();

    const handleChange = (e: any) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value
        });
    };

    const checkLogged = () =>{
        const sessionid = Cookies.get('sessionid');
            if(sessionid){
                // if session exist get out of the log in page
                router.push('/');
            }
    }

    // run the checklogged in user function
    checkLogged();

    const handleSubmit = async (e:any) => {
        e.preventDefault(); // Prevent the default form submission (which would be a GET request)

        const data = {
            username: e.target.username.value,
            password: e.target.password.value
          };
    
        // console.log('Sending data:', data);
        
        // let  me try to use axios
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/user/login/', data);

            if(response.data.sessionid){
                Cookies.set('sessionid', response.data.sessionid, { expires: 1 });
                // console.log('Session created:', response.data.sessionid);
                // Handle successful response
                setError('Success'); // Clear any previous errors

                // wait 3 seconds before redirecting 
                const timer = setTimeout(() => {
                    router.push('/');
                  }, 3000);
                
            }else{
                // console.log("Log in failed!");
                setError('error: Log in failed!');
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                // console.error('Axios error message:', error.message);
                // console.error('Axios error code:', error.code);
                // console.error('Axios error config:', error.config);
                // console.error('Axios error request:', error.request);
                // console.error('Axios error response:', error.response);
          
                // Accessing specific parts of the response
                if (error.response) {
                    console.error('Response data:', error.response.data.error);
                    console.error('Response status:', error.response.status);

                    // set the error for alert
                    setError(`${error.response.data.error}`);

                    // wait a second and remove the
                    const timer = setTimeout(() => {
                        // e.target.username.value = '';
                        e.target.password.value = '';
                    }, 1000);
                }
              } else {
                console.error('Unexpected error:', error);
              }
            // setError(error);
            // const timer = setTimeout(() => {
            //     e.target.username.value = '';
            //     e.target.password.value = '';
            //   }, 1000);
            
        }

/*        try {
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
          }*/
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
        {error && (
        <Alert>
            <AlertTitle>Alert</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    )}
    </form>
  )
}

export default Login