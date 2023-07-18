// PostList.js
import React from 'react';
import styles from '../../styles/Home.module.css';
import { Link } from 'react-router-dom';
const PostList = ({ posts }) => {
  return (
    <div className={styles.postListContainer}>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <div key={post.postId} className={styles.postListli}>
            <Link to={`/posts/${post.postId}`}>
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
      {/* Pagination 컴포넌트를 이곳에 추가 */}
    </div>
  );
};

export default PostList;
