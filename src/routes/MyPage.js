import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../styles/MyPage.module.css';

const MyPage = () => {

  const [nickname, setNickname] = useState('닉네임');
  const [sinceDate, setSinceDate] = useState('1');

  useEffect(() => {
    fetch(`/api/v1/mypages`)
      .then(response => response.json())
      .then(data => {
        setNickname(data.result.name);
        setSinceDate(data.result.sinceDate);
      })
      .catch(error => {
        console.error('login user 데이터를 가져오는 동안 오류가 발생했습니다.', error);
      });
  });

  return (
    <div>
      <div className={styles.fixedHeader}>
        <Header />
      </div>
      <div className={styles.centeredContainer}>
        <div className={styles.mypage}>
          <h1>마이페이지</h1>
          <div className={styles.mypageBox}>
            <p>
              <span>닉네임</span> {nickname}
            </p>
            <p>
              <span>PODA와 함께한 지</span> {sinceDate}일째
            </p>
            <p>
            <Link to="/recycle">            
              <button>휴지통</button>
            </Link>
            </p>
          </div>
          <div>
            <h1>설정</h1>
            <div className={styles.settingBox}>
              <a href='https://docs.google.com/forms/d/e/1FAIpQLSeYz01w9IFGmR_1HZc5BIK1jr9hAqrKBxEe08gRnMezLO2A_Q/viewform?usp=sf_link'>개발자에게 피드백 보내기</a>
              <p>로그아웃</p>
              <p>회원탈퇴</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;