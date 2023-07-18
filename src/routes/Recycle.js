import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Recycle.module.css';
import Header from '../components/Header';

const Recycle = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(3);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  };
  
  // inactive post 조회
  useEffect(() => {
    fetch(`/api/v1/in-active/posts?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setPosts(data.result.pagePosts);
        setTotalPages(data.result.totalPages);
        setTotalPosts(data.result.totalPosts);
      })
      .catch(error => {
        console.error('inactive post 데이터를 가져오는 동안 오류가 발생했습니다.', error);
      });
  }, [currentPage]);

  // delete post api
  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/v1/posts/${postId}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('post 삭제 중 오류가 발생했습니다.', error);
    }
};
  

  // update post active api
  const handleUpdateActive = async (postId) => {
    try {
      const response = await fetch(`/api/v1/posts/${postId}/restore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('post 삭제 중 오류가 발생했습니다.', error);
    }
};

  return (
    <div>
      <div className={styles.fixedHeader}>
        <Header />
        <h1>휴지통</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.postListContainer}>
          <ul className={styles.postList}>
          {posts && posts.map((post) => (
            <li key={post.title} className={styles.postListli}>
              <Link to={`/posts/${post.postId}`}>
                <div>
                  <div className={styles.titleDuration}>
                    <h3>{post.title}</h3>
                    <span className={styles.duration}>
                      {post.beginAt}~{post.finishAt}
                    </span>
                  </div>
                  <div className={styles.tags}>
                    {post.tagName.map((tag) => (
                      <span className={styles.tag} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.buttonContainer}>
                    <button className={styles.recycle} onClick={() =>handleUpdateActive(post.postId)}>복원</button>
                    <button className={styles.recycle} onClick={() =>handleDelete(post.postId)}>삭제</button>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          </ul>
          {totalPosts === 20 && (
            <div className={styles.pagination}>
              <button
                className={`${styles.pageButton} ${
                  currentPage === 0 ? styles.disabled : ''
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                이전
              </button>
              <button
                className={`${styles.pageButton} ${
                  currentPage === totalPages - 1 ? styles.disabled : ''
                }`}
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

export default Recycle;
