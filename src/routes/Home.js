import  React from 'react';
import  {useState} from 'react';
import '../styles/Home.css';
import Modal from '../components/Modal';
function Home() {
    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

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
                    <div >
                        <button class="modal-button" onClick={showModal}>전체</button>
                        {modalOpen && <Modal setModalOpen={setModalOpen} />}
                    </div>
                </div>
                <ul class="post-list">
                    <li>
                        <div class="title-duration">
                            <h3>교내 소모임 해커톤</h3>
                            <span class="duration">2022.06.01~2022.06.03</span>
                        </div>
                        <div class="tags">
                            <span class="tag">#SpringBoot</span>
                            <span class="tag">#단기간배포</span>
                        </div>
                    </li>
                    <li>
                        <div class="title-duration">
                            <h3>교내 소모임 해커톤</h3>
                            <span class="duration">2022.06.01~2022.06.03</span>
                        </div>
                        <div class="tags">
                            <span class="tag">#SpringBoot</span>
                            <span class="tag">#단기간배포</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Home;

