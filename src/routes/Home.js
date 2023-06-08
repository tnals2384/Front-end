import  React from 'react';
import  {useState} from 'react';
import '../styles/Home.css';
import Modal from '../components/Modal';


function Home() {
    //선택된 tag
    const [tags, setTags] = useState([]);
    // 모달창 노출 여부 state
    /*
    모달창 열 때, 서버에서 나의 tag list를 넘겨줘야 함!!
    */
    const [modalOpen, setModalOpen] = useState(false);
    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };
    //tag 삭제
    const handleTagClick = (tag) => {
        if (tags.includes(tag)) {
            // 이미 선택된 태그인 경우 제거
            setTags(tags.filter((selectedTag) => selectedTag !== tag));
        }
    };

    //내기록 목록
    const posts = [
        { title: '교내 해커톤', startDate: '2022.06.01',endDate:'2022.06.02',tags: ['#SpringBoot', '#백엔드'] },
        { title: '포다포다', startDate: '2022.06.01',endDate: '2022.06.02',tags: ['#단기간배포']},
        { title: '글 3', startDate: '2022.06.01',endDate: '2022.06.02',tags: ['#백엔드'] },

        // ...
    ];

    //선택된 태그의 글만 표시
    const filteredPosts = posts.filter((post) =>
    tags.every((tag) => post.tags.includes(tag))
        );


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
            <div class="container">
                <h1>고삼이님의 기록 💪🏻</h1>
                <div class="button-container">
                    <div class="dropdown">
                    <button class="button">기간</button>
                        <div class="dropdown-content">
                        <button>최신순</button>
                        <button>오래된순</button>
                        </div>
                    </div>
                    <div>
                        <button class={`button ${tags.length !=0 ? "not-selected" : ""}`} onClick={showModal}>전체</button>
                        {modalOpen && <Modal tags={tags} setTags={setTags} setModalOpen={setModalOpen} />}
                    </div>
                    {tags.map((tag) => (
                    <button class="button" key={tag} onClick={() => handleTagClick(tag)}>{tag}</button>))}
                </div>
                <ul class="post-list">
                {filteredPosts.map((post) => (
                    <div key={post.title}>
                        <li>
                        <div class="title-duration">
                            <h3>{post.title}</h3>
                            <span class="duration">{post.startDate}~{post.endDate}</span>
                        </div>
                        <div class="tags">
                        {post.tags.map((tag) => (
                            <span  class="tag" key={tag}>{tag}</span>
                        ))}
                        </div>
                    </li>
                    </div>
                ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;

