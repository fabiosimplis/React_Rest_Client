import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css';
import logo from '../../assets/fj.jpg'

export default function Books(){
    
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);

    const username = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');

    const navigate = useNavigate();

    const headers = useMemo(() => ({
        Authorization: `Bearer ${accessToken}`
    }), [accessToken]);

    const params = useMemo(() => ({
        page: page,
        size: 8,
        direction: 'asc'
    }), [page]);

    async function logout() {

        localStorage.clear();
        navigate('/');
    }

    async function editBook(id) {
        try {
            navigate(`/book/new/${id}`);
        } catch (error) {
            alert('Edit Failed! try again.');
        }
    }

    async function deleteBook(id) {

        try {
            await api.delete(`api/book/v1/${id}`, { headers, params });

            setBooks(books.filter(book => book.id !== id))
        } catch (error) {
            alert('Delete failed! Try again.');
        }
    }

    const fetchMoreBooks = useCallback(async () => {
        const response = await api.get('api/book/v1', { headers, params });

        setBooks([...books, ...response.data._embedded.bookVOList]);
        setPage(page + 1);
    }, [headers, params, setBooks, setPage, books, page]);

    useEffect(() => {
        fetchMoreBooks();
    }, []); 


    return (
        <div className="book-container">
            <header>
                <img src={logo} alt="FJ" />
                <span>Welcome, <strong>{username.toUpperCase()}</strong>! </span>
                <Link className="button" to={{ pathname: '/book/new/0' }}> Add New Book</Link>
                <button onClick={logout} type="button">
                    <FiPower size={18} color="#251FC5"/>
                </button>
            </header>

            <h1>Registred Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>Title: </strong>
                        <p>{book.title}</p>
                        <strong>Author: </strong>
                        <p>{book.author}</p>
                        <strong>Price:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                        <strong>Release Date: </strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(book.lauchDate)}</p>

                        <button onClick={() => editBook(book.id)} type="button">
                            <FiEdit size={20} color="#251FC5"/>
                        </button>
                        <button onClick={() => deleteBook(book.id)} type="button">
                            <FiTrash2 size={20} color="#251FC5"/>
                        </button>
                    </li>
                ))}

            </ul>
            
            <button className="button" onClick={fetchMoreBooks} type="button">Load More</button>
        </div>
    );
}