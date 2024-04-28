import React from "react";
import{BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';

export default function Rotas(){

    return(
        //BrowserRouter Garante o roteamento correto
        
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}