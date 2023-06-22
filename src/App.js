import React, { useEffect, useState } from 'react';
import Login from '../src/routes/Login';
import Home from '../src/routes/Home';
import Write from '../src/routes/Write';
import PostDetail from './routes/PostDetail';


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    

        //내기록 목록
        const posts = [
            {
                id:1,
                title: '교내 해커톤',
                startDate: '2022-06-01',
                endDate: '2022-06-02',
                tags: {
                    '관련 직무': ['#백엔드'],
                    '핵심 역량': ['#협동', '#협업'],
                    '사용한 기술': ['#SpringBoot', '#Docker'],
                  },
                file: 
                //임시! 나중에 file형식으로 가져오면됨
                    []
                
            },
            {
                id:2,
                title: '포다포다',
                startDate: '2022.06.01',
                endDate: '2022.06.02',
                tags: {
                    '관련 직무': ['#백엔드'],
                    '핵심 역량': ['#협동', '#협업'],
                    '사용한 기술': ['#SpringBoot', '#Docker'],
                  },
                file: 
                //임시! 나중에 file형식으로 가져오면됨
                    ['최종보고서.doc','PODA.png']
            },
            {
                id:3,
                title: '글 3',
                startDate: '2022.06.02',
                endDate: '2022.06.03',
                tags: {
                    '관련 직무': ['#백엔드'],
                    '핵심 역량': ['#협동', '#협업'],
                    '사용한 기술': ['#SpringBoot', '#Docker'],
                  },
                file: 
                //임시! 나중에 file형식으로 가져오면됨
                    ['최종보고서.doc','PODA.png']
            },
    
            // ...
        ];

    return <Router>
        <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/write" element={<Write />} />
            <Route path="/posts/:id" element={<PostDetail posts={posts} />} />
        </Routes>
    </Router>

}


export default App;
