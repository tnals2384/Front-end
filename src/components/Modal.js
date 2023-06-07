import React from 'react';
import styles from '../styles/Modal.module.css';

function Modal({ setModalOpen}) {
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.modalBox}>
            <div className={styles.container}>
                <button className={styles.close} onClick={closeModal}>
                    저장
                </button>
                <div className={styles.tagBox}>
                    <h2>관련 직무</h2>
                    <div class="tags">
                            <button className={styles.tag}>#SpringBoot</button>
                            <button className={styles.tag}>#단기간배포</button>
                        </div>
                </div>
                <div className={styles.tagBox}>
                    <h2>키워드</h2>
                    <div class="tags">
                            <button className={`${styles.selectTag} ${styles.tag}`}>#SpringBoot</button>
                            <button className={styles.tag}>#단기간배포</button>
                        </div>
                </div>
                <div className={styles.tagBox}>
                    <h2>사용기술</h2>
                    <div class="tags">
                            <button className={styles.tag}>#SpringBoot</button>
                            <button className={styles.tag}>#단기간배포</button>
                        </div>
                </div>
            </div>
        </div>
    );
}
export default Modal;