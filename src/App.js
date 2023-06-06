import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        //토큰 확인을 위한 API 호출
        const checkToken = async () => {
            try {
                const response = await fetch('http://localhost:8080/token');
                const data = await response.json();
                console.log(data)
                setIsLoggedIn(data.token !== null && data.token !== "클라이언트 없음");
            } catch(error) {
                console.log(error);
            }
        };

        checkToken();
    },[]);
    
    
    
    return <Router>
        <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>

}

function Home() {
  return <div>Home Page</div>;
}

function Login() {
  return <div>Login Page</div>;
}

export default App;
