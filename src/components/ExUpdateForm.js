import React from 'react';

import styles from '../styles/Detail.module.css';


//단일조회에서 exprience update를 위한 form
const ExUpdateForm = ({ title, setTitle, content, setContent, onUpdate }) => {
    const handleTitleChange = event => {
        const newTitle = event.target.value;
        setTitle(newTitle);
    };

    const handleTextChange = event => {
        const newText = event.target.value;
        setContent(newText);
    };

    const characterCount = content.length;

    const handleUpdate = () => {
        onUpdate(); // 부모 컴포넌트로 저장 요청
    };

    return (
        <div className={styles.exContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.titleCharacterContainer}>
                    <input
                        className={styles.inputTitle}
                        type="text"
                        placeholder="제목을 입력하세요"
                        onChange={handleTitleChange}
                        value={title}
                    />
                    <div className={styles.characterCount}>
                        {characterCount}자
                    </div>
                </div>
                <button className={styles.updateButton} onClick={handleUpdate}>
                    저장
                </button>
            </div>
            <textarea
                className={styles.textContainer}
                value={content}
                onChange={handleTextChange}
                placeholder="내용"
            />
        </div>
    );
};

export default ExUpdateForm;
