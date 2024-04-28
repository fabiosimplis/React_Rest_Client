import React from "react";
import{BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Book from "./pages/Book";

export default function Rotas(){

    return(
        //BrowserRouter Garante o roteamento correto
        
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/book' element={<Book/>} />
            </Routes>
        </BrowserRouter>
    );
}