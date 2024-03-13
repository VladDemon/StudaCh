import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

import { useAuth } from './Auth';

import { useAuthContext } from './GetLoginPass';

import './LoginPage.css'

const inputs = document.getElementById("Form-input__input")



const SignIn: FC = () => {
  const [user, setUser] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const navigate = useNavigate();

  const {setAuthData} = useAuthContext()

  const { setIsLoggedSuccessful } = useAuth();

  useEffect(()=>{
    const checkIsLogged = async () =>{

      const loggedInUser = sessionStorage.getItem(user)
      console.log(loggedInUser, user)
      if(loggedInUser === "true"){
        console.log(1)
        setUser(loggedInUser);
        setIsLoggedSuccessful(true)
      }
    }
    checkIsLogged();
  }, [setIsLoggedSuccessful])

  const handleSignIn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!user || !pass) {
      // console.log("Please enter both username and password.");
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

    setAuthData(login, password);

    if (isLoggedSuccess) {
      console.log("YYESSS")
      sessionStorage.setItem(login, "true");
      setIsLoggedSuccessful(true)
      if(isLoggedSuccess === true){
        navigate('/pages/Studies');
      }
    } else {
      console.log(inputs)

      setTimeout(()=>{

      }, 600)
      console.log("No Repeat Your Pass")
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