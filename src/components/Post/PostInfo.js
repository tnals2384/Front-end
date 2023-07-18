import React from 'react';
import styles from '../../styles/Detail.module.css';
import PostUpdateModal from './PostUpdateModal';

const PostInfo = ({ post, postId, onDeleteClick, onSettingsClick, modalOpen, setModalOpen, handleUpdate }) => {
  return (
    <div className={styles.postInfo}>
      <div className={styles.titleLine}>
        <h1 className={styles.title}>{post.title}</h1>
        <button
          className={styles.postDelete}
          onClick={() => onDeleteClick(postId)}
        >
          글 삭제
        </button>
        <img
          src="/setting.png"
          alt="세팅 이미지"
          className={styles.setting}
          onClick={onSettingsClick}
        />
        {modalOpen && (
          <PostUpdateModal
            initData={post}
            onUpdate={handleUpdate}
            setModalOpen={setModalOpen}
          />
        )}
      </div>
      <span className={styles.duration}>
        {post.startDate} ~ {post.endDate}
      </span>
      <div className={styles.tagColumn}>
        <strong className={styles.label}>관련 직무</strong>
        <ul className={styles.tagContainer}>
          {post.jobTags.map(tag => (
            <li className={styles.tag} key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.tagColumn}>
        <strong className={styles.label}>핵심 역량</strong>
        <ul className={styles.tagContainer}>
          {post.abilityTags.map(tag => (
            <li className={styles.tag} key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.tagColumn}>
        <strong className={styles.label}>
          사용 기술
        </strong>
        <ul className={styles.tagContainer}>
          {post.stackTags.map(tag => (
            <li className={styles.tag} key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostInfo;
