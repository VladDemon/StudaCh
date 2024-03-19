import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");   
    const navigate = useNavigate();
    const HandleReg = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(userName.length > 0 && password.length >0){
            try {
                const response = await axios.post('http://localhost:3001/app/register', {user: userName, pass: password}, {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                });
                console.log(response.data.success);
                const success = response.data.success;
                if(success){
                    navigate("/sign/login-in")
                }
            } catch (error) {
                console.error("Error", error);
            }
        } else{
            alert("Your password or login is not valid")
        }
    
    }
    return (
        <div className="Page">
            <div className="Form">
                <h1>Registration</h1>
                    <form className="Form-input-reg">
                        <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="userName" type="username" />
                        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
                        <div className='Form-input-reg__button'>
                            <button onClick={HandleReg}>Sign Up</button>
                        </div>
                </form>
            </div>
        </div>
    )
}
export default RegistrationPage;