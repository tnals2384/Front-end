import React, { useState } from 'react';
import Login from '../src/routes/Login';
import Home from '../src/routes/Home';
import Write from '../src/routes/Write';
import PostDetail from './routes/PostDetail';
import MyPage from '../src/routes/MyPage';
import Recycle from '../src/routes/Recycle';
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
            <Route path="/" element={isLoggedIn ? <Home/> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/write" element={<Write />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/recycle" element={<Recycle />} />
        </Routes>
    </Router>

}


export default App;
