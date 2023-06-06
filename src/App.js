import React, { useEffect, useState } from 'react';
import Login from '../src/routes/Login';
import Home from '../src/routes/Home';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    
    return <Router>
        <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>

}


export default App;
