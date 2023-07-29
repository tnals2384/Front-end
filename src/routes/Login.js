import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css';


const Login = ({ setIsLoggedIn }) => {

    const handleGoogleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <div className={styles.main}>
            <img className={styles.mainImg} src="/PODA.png" alt="mainImg" />
            <div className={styles.googleLogin}>
                <Link to="http://localhost:8080/oauth2/authorization/google" onClick={handleGoogleLogin} className={styles.googleButton}>
                    <div className={styles.googleIconWrapper}>
                        <img
                            className={styles.googleIcon}
                            src="/google-icon.png"
                            alt="google-icon"
                        />
                    </div>
                    <span className={styles.buttonText}>구글로 로그인</span>
                </Link>
            </div>
        </div>
    );
};

export default Login;
