import React from 'react';
import '../styles/Home.css';
function Home() {

    return (
        <div>
            <nav>
                <div class="logo">
                    <img src="/logo.png" alt="로고 이미지"/>
                </div>
                <div class="nav-buttons">
                <button class="write-button">글쓰기</button>
                <button class="mypage-button">마이페이지</button>
                <button class="login-button">로그인</button>
                </div>
            </nav>
            <div class="container">
                <h1>고삼이님의 기록 💪🏻</h1>
                <div class="button-container">
                    <div class="dropdown">
                    <button class="dropdown-btn">기간</button>
                        <div class="dropdown-content">
                        <button>최신순</button>
                        <button>오래된순</button>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropdown-btn">전체</button>
                        <div class="dropdown-content">
                        <button></button>
                        <button></button>
                        </div>
                    </div>
                </div>
                <ul class="post-list">
                    <li>글 1</li>
                    <li>글 2</li>
                    <li>글 3</li>
                </ul>
            </div>
        </div>
    );
}

export default Home;