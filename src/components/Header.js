import React, { Component } from 'react'
import '../styles/Header.css';

function Header()  {

    return (
      <div>
        <nav>
            <div class="logo">
                <img src="/logo.png" alt="로고 이미지"/>
            </div>
            <div class="nav-buttons">
                <button class="write-button">글쓰기</button>
                <button class="mypage-button">마이페이지</button>
                <button class="login-button">로그아웃</button>
            </div>
        </nav>
      </div>
    )
  
}

export default Header;