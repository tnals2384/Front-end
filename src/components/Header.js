import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <div>
            <nav>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src="/logo.png" alt="로고 이미지" />
                    </Link>
                </div>
                <div className={styles.navButtons}>
                    <Link to="/write" className={styles.writeButton}>
                        글쓰기
                    </Link>
                    <button className={styles.mypageButton}>마이페이지</button>
                    <button className={styles.loginButton}>로그아웃</button>
                </div>
            </nav>
        </div>
    );
};

export default Header;
