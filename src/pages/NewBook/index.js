import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css';
import logo from '../../assets/fj.jpg'


export default function NewBook(){

    const [id, setId] = useState(null);
    const [author, setAuthor] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');

    const {bookId} = useParams();

    const accessToken = localStorage.getItem('accessToken');

    const data = {
        title,
        author,
        launchDate,
        price,
    }

    const headers = useMemo(() => ({
        Authorization: `Bearer ${accessToken}`
    }), [accessToken]);
    
    const navigate = useNavigate();

    useEffect(() => {

        async function loadBook() {
            try {
                const response = await api.get(`api/book/v1/${bookId}`, {headers});
                
                let adjustDate = response.data.launchDate.split('T')[0];
                
                setId(response.data.id);
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPrice(response.data.price);
                setLaunchDate(adjustDate);
    
            } catch (error) {
                alert('Error recovering Book! Try again!');
                navigate('/books');
            }
        }

        if (bookId === '0') {
            return;
        } else {
            loadBook();
        }
    }, [bookId, headers, setId, setTitle, setAuthor, setPrice, setLaunchDate, navigate]);


    async function saveOrUpdate(event){
        event.preventDefault();

        try {
            if (bookId === '0') {
                await api.post('api/book/v1', data, { headers });
            } else {
                data.id = id;
                await api.put('api/book/v1', data, { headers });
            }
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
                    <h1>{bookId === '0' ? 'Add New' : 'Update'}</h1>
                    <p>Enter the book information and click on {bookId === '0' ? 'Add' : 'Update'}! # {bookId}</p>
                    <Link className="back-link" to={{ pathname: '/books' }}>
                        <FiArrowLeft size={16} color="#251FC5"/>
                        Back to Book
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
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

                    <button className="button" type="submit">{bookId === '0' ? 'Add' : 'Update'}</button>
                </form>
            </div>
        </div>
    );
}