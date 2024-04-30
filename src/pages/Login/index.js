import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles.css'

import api from '../../services/api'

import padlock from '../../assets/padlock.png'
import logo from '../../assets/fj.jpg'

export default function Login({children}){
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function login(event){
        event.preventDefault();

        const data = {
            username,
            password,
        };

        try {
            const response = await api.post('auth/signin', data);

            localStorage.setItem('username', username);
            localStorage.setItem('accessToken', response.data.token);
            
            navigate('/books');
        } catch (error) {
            alert('Login failed! Try again!');
        }
    };

    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="FJ Logo"/>
                <form onSubmit={login}>
                    <h1>Access your Accout</h1>
                    <input
                        placeholder="Username" 
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                     />
                    <input
                        type="password" placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                     />
                    
                    <button className="button" type="submit">Login</button>
                </form>

            </section>
            
            <img src={padlock} alt="Login" />

        </div>
    )
}