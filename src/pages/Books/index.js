import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css';
import logo from '../../assets/fj.jpg'

export default function Books(){
    
    const [books, setBooks] = useState([]);

    const username = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');

    const navigate = useNavigate();

    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    useEffect(() => {
        api.get('api/book/v1', { headers })
        .then(response => {
            setBooks(response.data._embedded.bookVOList)
        })
    })


    return (
        <div className="book-container">
            <header>
                <img src={logo} alt="FJ" />
                <span>Welcome, <strong>{username.toUpperCase()}</strong>! </span>
                <Link className="button" to={{ pathname: '/book/new' }}> Add New Book</Link>
                <button type="button">
                    <FiPower size={18} color="#251FC5"/>
                </button>
            </header>

            <h1>Registred Books</h1>
            <ul>
                {books.map(book => (
                    <li>
                    <strong>Title: </strong>
                    <p>{book.title}</p>
                    <strong>Author: </strong>
                    <p>{book.author}</p>
                    <strong>Price:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                    <strong>Release Date: </strong>
                    <p>{Intl.DateTimeFormat('pt-BR').format(book.lauchDate)}</p>

                    <button type="button">
                        <FiEdit size={20} color="#251FC5"/>
                    </button>
                    <button type="button">
                        <FiTrash2 size={20} color="#251FC5"/>
                    </button>
                </li>
                ))}

            </ul>
            
        </div>
    );
}