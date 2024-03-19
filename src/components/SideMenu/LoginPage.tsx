import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

import { useAuth } from './Auth';

import { useAuthContext } from './GetLoginPass';

import './LoginPage.css'



const SignIn = () => {
  const [user, setUser] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const navigate = useNavigate();
  const {setAuthData} = useAuthContext()
  const { setIsLoggedSuccessful } = useAuth();

  useEffect(()=>{
    const checkIsLogged = async () =>{

      const loggedInUser = sessionStorage.getItem(user)
      if(loggedInUser === "true"){
        setUser(loggedInUser);
        setIsLoggedSuccessful(true)
      }
    }
    checkIsLogged();
  }, [setIsLoggedSuccessful])

  const handleSignIn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!user || !pass) {
      console.log("Please enter both username and password.");
      return;
    }

    const response = await axios.post('http://localhost:3001/app/login', { user, pass }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const isLoggedSuccess: boolean = response.data.success;
    const login = response.data.user;
    const password = response.data.pass;
    const success = response.data.success;
    const id = response.data.sessionId;
    setAuthData(login, password);
    console.log(response.data);
    if (success) {
      localStorage.setItem(login, "true");
      localStorage.setItem("sessionId", id);
      setIsLoggedSuccessful(true)
        navigate('/pages/Studies');
    } else {
      console.log('Login failed:', response.data.message);
    }
  };
  

  
  return (
    <div className="Page">
      <div className="Form">
        <h1>Login</h1>
        <form className="Form-input" action='#'>
          <input autoComplete='name' onChange={e => setUser(e.target.value)} placeholder="userName" type="username" />
          <input autoComplete='new-password' onChange={e => setPass(e.target.value)} placeholder="password" type="password" />
          <div className="Form__buttons">
            <button onClick={handleSignIn}>Sign In</button>
            <Link id="Form-reg-link" to={"/sign/login-up"}>Don't have an Accout? Click</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;