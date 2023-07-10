import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Modal from '../components/Modal';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
    //posts 목록
    const [posts, setPosts] = useState([]);
    //최신순, 오래된순 정렬방법
    const [orderBy, setOrderBy] = useState('newest');
    //현재 페이지 
    const [currentPage, setCurrentPage] = useState(0);
    //총 page 수
    const [totalPages, setTotalPages] = useState(1);
    //총 post 수
    const [totalPosts, setTotalPosts] = useState(0);
    
    //page가 바뀌면 화면을 top으로 이동
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0});
    };
    
    //최신순, 오래된순 버튼 선택시 set
    const handleOrderClick = (order) => {
        setOrderBy(order);
    };
    
    //api get요청으로 orderBy에 따라 posts목록 받아오기
    useEffect(() => {
        fetch(`/api/v1/posts?page=${currentPage}&orderBy=${orderBy}`)
          .then(response => response.json())
          .then(data => {
            setPosts(data.result.pagePosts);
            setTotalPages(data.result.totalPages);
            setTotalPosts(data.result.totalPosts);
          })
          .catch(error => {
            console.error('post 데이터를 가져오는 동안 오류가 발생했습니다.', error);
          });
      }, [orderBy,currentPage]);


    //선택된 태그
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagPosts, setTagPosts] = useState([]);

    //api get요청으로 선택된 tags에 해당하는 posts목록 받아오기
    useEffect(() => {
        const fetchData = async () => {
          try {
            const params = selectedTags.map(tag => `tag=${encodeURIComponent(tag)}`);
            const query = params.join('&');
            const url = `/api/v1/posts/tag?${query}&page=${currentPage}`;
            const response = await axios.get(url);
            setTagPosts(response.data.result.pagePosts);
            setTotalPages(response.data.result.totalPages);
            setTotalPosts(response.data.result.totalPosts);
          } catch (error) {
                console.error('post 데이터를 가져오는 동안 오류가 발생했습니다.', error);
          }
        };

        if (selectedTags.length > 0) {
            fetchData();
          } else {
            // selectedTags가 비어있을 때에는 tagPosts를 초기화
            setTagPosts([]);
          }
      }, [selectedTags,currentPage]);
    
    
    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    //tag 삭제
    const handleTagClick = tag => {
        if (selectedTags.includes(tag)) {
            // 이미 선택된 태그인 경우 제거
            setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
          } else {
            // 선택되지 않은 태그인 경우 추가
            setSelectedTags([...selectedTags, tag]);
          }
        setCurrentPage(0);
    };

    return (
        <div>
            <div className={styles.fixedHeader}>
                <Header />
                <h1>고삼이님의 기록 💪🏻</h1>
                
            </div>
            <div className={styles.container}>
                <div className={styles.buttonContainer}>
                    <div className={styles.dropdown}>
                        <button className={styles.button}>기간</button>
                        <div className={styles.dropdownContent}>
                        <button onClick={() => handleOrderClick('newest')}>최신순</button>
                        <button onClick={() => handleOrderClick('oldest')}>오래된순</button>
                        </div>
                    </div>
                    <div>
                        <button
                            className={`${styles.button} ${
                                selectedTags.length !== 0 ? styles.notSelected : ''
                            }`}
                            onClick={showModal}
                        >
                            전체
                        </button>
                        {modalOpen && (
                            <Modal
                                selectedTags={selectedTags}
                                setSelectedTags={setSelectedTags}
                                setModalOpen={setModalOpen}
                                setCurrentPage={setCurrentPage}
                            />
                            )}
                    </div>
                    {selectedTags.map(tag => (
                        <button
                            className={styles.button}
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                <div className={styles.postListContainer}>
                    <ul className={styles.postList}>
                    {selectedTags.length === 0
                    ? posts.map((post) => (
                        <div key={post.id} className={styles.postListli}>
                            <Link to={`/posts/${post.id}`}>
                            <li>
                                <div className={styles.titleDuration}>
                                <h3>{post.title}</h3>
                                <span className={styles.duration}>
                                    {post.beginAt}~{post.finishAt}
                                </span>
                                </div>
                                <div className={styles.tags}>
                                {post.tagName.map(tag => (
                                    <span className={styles.tag} key={tag}>
                                    {tag}
                                    </span>
                                ))}
                                </div>
                            </li>
                            </Link>
                        </div>
                        ))
                    : tagPosts.map((post) => (
                        <div key={post.id} className={styles.postListli}>
                            <Link to={`/posts/${post.id}`}>
                            <li>
                                <div className={styles.titleDuration}>
                                <h3>{post.title}</h3>
                                <span className={styles.duration}>
                                    {post.beginAt}~{post.finishAt}
                                </span>
                                </div>
                                <div className={styles.tags}>
                                {post.tagName.map(tag => (
                                    <span className={styles.tag} key={tag}>
                                    {tag}
                                    </span>
                                ))}
                                </div>
                            </li>
                            </Link>
                        </div>
                        ))}
                    </ul>
                    {totalPosts > 0 && (
                    <div className={styles.pagination}>
                        <button
                        className={`${styles.pageButton} ${currentPage === 0? styles.disabled : ''}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        >
                        이전
                        </button>
                        <button
                        className={`${styles.pageButton} ${currentPage === totalPages -1 ? styles.disabled : ''}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        >
                        다음
                        </button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;