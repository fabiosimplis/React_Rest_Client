import React, {useState} from 'react';

import './global.css'

import Login from './pages/Login'

export default function App() {
  let [counter, setCouter] = useState(0);

  function increment(){
    setCouter(counter + 1);
  }
  
  return (
    <Login/>
  );
}

