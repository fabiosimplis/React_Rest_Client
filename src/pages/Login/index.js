import React from "react";
import './styles.css'

import padlock from '../../assets/padlock.png'
import logo from '../../assets/fj.jpg'

export default function Login({children}){
    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="FJ Logo"/>
                <form action="">
                    <h1>Access your Accout</h1>
                    <input placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit"/>
                </form>

            </section>
            
            <img src={padlock} alt="Login" />

        </div>
    )
}