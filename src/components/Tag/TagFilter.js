// TagFilter.js
import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import TagModal from '../Tag/TagModal';

const TagFilter = ({ selectedTags, setSelectedTags, setCurrentPage, setOrderBy }) => {
    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };
    //최신순, 오래된순 버튼 선택시 set
    const handleOrderClick = (order) => {
    setOrderBy(order);
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
      <div className={styles.buttonContainer}>
        <div className={styles.dropdown}>
          <button className={styles.button}>기간</button>
          <div className={styles.dropdownContent}>
            <button onClick={() => handleOrderClick('newest')}>최신순</button>
            <button onClick={() => handleOrderClick('oldest')}>오래된순</button>
          </div>
          <button
            className={`${styles.button} ${
              selectedTags.length !== 0 ? styles.notSelected : ''
            }`}
            onClick={showModal}
          >
            전체
          </button>
          {modalOpen && (
            <TagModal
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              setModalOpen={setModalOpen}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
        {selectedTags.map((tag) => (
          <button
            className={styles.button}
            key={tag}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    );
};

export default TagFilter;
