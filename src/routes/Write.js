import React, { Component } from 'react'
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import "../styles/Write.css";
function Write() {
    
    return (
      <div>
        <Header />
        <div className='write-container'>
            <h1>소중한 경험을 기록해주세요 🥳</h1>
            <PostForm />

        </div>
      </div>
    )
}

export default Write;