import React from 'react';
import Header from '../components/Header';
import styles from '../styles/MyPage.module.css';

const MyPage = () => {

  const handleTrashClick = () => {
    window.location.href = '/'; // 휴지통 페이지로 이동하도록 수정
  };

  // 임시 사용자 프로필
  const profile = {
    nickname: '고삼이',
    daysSinceSignup: '14',
  };

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
              <span>닉네임</span> {profile.nickname}
            </p>
            <p>
              <span>PODA와 함께한 지</span> {profile.daysSinceSignup}일째
            </p>
            <p>
              <button onClick={handleTrashClick}>휴지통</button>
            </p>
          </div>
          <div>
            <h1>설정</h1>
            <div className={styles.settingBox}>
              <a href='https://docs.google.com/forms/d/e/1FAIpQLSeYz01w9IFGmR_1HZc5BIK1jr9hAqrKBxEe08gRnMezLO2A_Q/viewform?usp=sf_link'>개발자에게 피드백 보내기</a>
              <p>개인정보 처리방침</p>
              <p>이용약관</p>
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