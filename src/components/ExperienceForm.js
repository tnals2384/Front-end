import React, { useState } from 'react';

import styles from '../styles/Write.module.css';
const ExperienceForm = ({ title, onRemove }) => {
    const [text, setText] = useState('');

    const handleTextChange = event => {
        const newText = event.target.value;
        setText(newText);
    };

    const characterCount = text.length;

    const handleRemove = () => {
        onRemove(); // 부모 컴포넌트로 삭제 요청 전달
    };

    return (
        <div className={styles.exContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.titleCharacterContainer}>
                    {title !== '' ? (
                        <div className={styles.title}>{title}</div>
                    ) : (
                        <input
                            className={styles.inputTitle}
                            type="text"
                            placeholder="제목을 입력하세요"
                        />
                    )}
                    <div className={styles.characterCount}>
                        {characterCount}자
                    </div>
                </div>
                <button className={styles.deleteButton} onClick={handleRemove}>
                    X
                </button>
            </div>
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="내용"
            />
        </div>
    );
};

export default ExperienceForm;
