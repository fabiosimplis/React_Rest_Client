import React from "react";
import{BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from "./pages/Login";
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";

export default function Rotas(){

    return(
        //BrowserRouter Garante o roteamento correto
        
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/books' element={<Books/>} />
                <Route exact path='/book/new/:bookId' element={<NewBook/>} />
            </Routes>
        </BrowserRouter>
    );
}