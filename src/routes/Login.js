import React from 'react' 
import '../styles/Login.css';
function Login() {
    return (
        <div class="main">
            <img class="mainImg" src='/PODA.png' alt = "mainImg"/>
            <div class="google-login">
                <a href="#" class="google-button">
                <div class="google-icon-wrapper">
                    <img class="google-icon" src="/google-icon.png"/>
                </div>
                <span class="button-text">구글로 로그인</span>
                </a>
            </div>
        </div>
    );
}

export default Login;
