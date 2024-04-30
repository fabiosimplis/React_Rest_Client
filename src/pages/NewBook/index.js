import React, { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css';
import logo from '../../assets/fj.jpg'


export default function NewBook(){

    //const [id, setId] = useState(null);
    const [author, setAuthor] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');

    const {bookId} = useParams();

    const accessToken = localStorage.getItem('accessToken');

    const navigate = useNavigate();

    async function createNewBook(event){
        event.preventDefault();

        const data = {
            title,
            author,
            launchDate,
            price,
        }

        const headers = {
            Authorization: `Bearer ${accessToken}`
        };

        try {
            await api.post('api/book/v1', data, { headers });            
            navigate('/books');
        } catch (error) {
            alert('Error while recording Book! Try again!');
        }
    }
    return (
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                    <img src={logo} alt="FJ" />
                    <h1>Add New Book</h1>
                    <p>Enter the book information and click on 'Add'! #### {bookId}</p>
                    <Link className="back-link" to={{ pathname: '/books' }}>
                        <FiArrowLeft size={16} color="#251FC5"/>
                        Home
                    </Link>
                </section>
                <form onSubmit={createNewBook}>
                    <input
                        placeholder="Title" 
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <input
                        placeholder="Author" 
                        value={author}
                        onChange={event => setAuthor(event.target.value)}
                    />
                    <input
                        type="date" 
                        value={launchDate}
                        onChange={event => setLaunchDate(event.target.value)}
                    />
                    <input
                        placeholder="price" 
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                    />

                    <button className="button" type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}