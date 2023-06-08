import React, { Component } from 'react'
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import styles from "../styles/Write.module.css";
function Write() {
    
    return (
      <div>
        <Header />
        <div className={styles.writeContainer}>
            <h1>소중한 경험을 기록해주세요 🥳</h1>
            <PostForm />

        </div>
      </div>
    )
}

export default Write;