import React from 'react';
import styles from '../styles/Modal.module.css';

const Modal =({ setModalOpen, tags, setTags}) => {

    const handleTagClick = (tag) => {
        if (tags.includes(tag)) {
            // 이미 선택된 태그인 경우 제거
            setTags(tags.filter((selectedTag) => selectedTag !== tag));
        } else {
            // 선택되지 않은 태그인 경우 추가
            setTags([...tags, tag]);
        }
    };

    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };


    /*
    서버에서 넘겨준 myTagList를 통해 아래 버튼들을 구성해야함.
    지금은 임시!
    */
    return (
        <div className={styles.modalBox}>
            <div className={styles.container}>
                <button className={styles.close} onClick={closeModal}>
                    저장
                </button>
                <div className={styles.tagBox}>
                    <h2>관련 직무</h2>
                    <div class="tags">
                        <button
                            className={`${styles.tag} ${tags.includes('#프론트엔드') ? styles.selected : ''}`}
                            onClick={() => handleTagClick('#프론트엔드')}>
                            #프론트엔드
                        </button>
                        <button
                            className={`${styles.tag} ${tags.includes('#백엔드') ? styles.selected : ''}`}
                            onClick={() => handleTagClick('#백엔드')}>
                            #백엔드
                        </button>
                    </div>
                </div>
                <div className={styles.tagBox}>
                    <h2>키워드</h2>
                    <div class="tags">
                    <button
                            className={`${styles.tag} ${tags.includes('#단기간배포') ? styles.selected : ''}`}
                            onClick={() => handleTagClick('#단기간배포')}>
                            #단기간배포
                        </button>
                    </div>
                </div>
                <div className={styles.tagBox}>
                    <h2>사용기술</h2>
                    <div class="tags">
                        <button
                            className={`${styles.tag} ${tags.includes('#SpringBoot') ? styles.selected : ''}`}
                            onClick={() => handleTagClick('#SpringBoot')}>
                            #SpringBoot
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal;