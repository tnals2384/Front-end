import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../styles/Recycle.module.css';
import Modal from '../components/Modal';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
    //posts 목록
    const posts = [
        {
            id: 1,
            title: '교내 해커톤',
            startDate: '2022.06.01',
            endDate: '2022.06.02',
            tags: ['#SpringBoot', '#백엔드'],
        },
        {
            id: 2,
            title: '포다포다',
            startDate: '2022.06.01',
            endDate: '2022.06.02',
            tags: ['#단기간배포'],
        },
        {
            id: 3,
            title: '글 3',
            startDate: '2022.06.01',
            endDate: '2022.06.02',
            tags: ['#백엔드'],
        },
        // ...
    ];
    
    return (
        <div>
            <div className={styles.fixedHeader}>
                <Header />
                <h1>휴지통</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.postListContainer}>
                    <ul className={styles.postList}>
                        {filteredPosts.map(post => (
                            <div key={post.title} className={styles.postListli}>
                                <Link to={`/posts/${post.id}`}>
                                    <li>
                                        <div className={styles.titleDuration}>
                                            <h3>{post.title}</h3>
                                            <span className={styles.duration}>
                                                {post.startDate}~{post.endDate}
                                            </span>
                                        </div>
                                        <div className={styles.tags}>
                                            {post.tags.map(tag => (
                                                <span
                                                    className={styles.tag}
                                                    key={tag}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </li>
                                </Link>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Recycle;