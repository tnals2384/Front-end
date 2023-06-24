import React, { useState } from 'react';
import styles from '../styles/Detail.module.css';


const ExCreateForm = ({ experiences, setExperiences,onAddExperience }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');



  const handleSave = () => {
    const newExperience = {
      experienceId: experiences.length + 1,
      title: title,
      content: content,
    };
    onAddExperience(newExperience);
    setTitle('');
    setContent('');
  };


  const characterCount = content.length;

  return (
    <div className={styles.exContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.titleCharacterContainer}>
                    <input
                        className={styles.inputTitle}
                        placeholder="제목을 입력하세요"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className={styles.characterCount}>
                        {characterCount}자
                    </div>
                </div>
                <button className={styles.updateButton} onClick={handleSave}>
                    저장
                </button>
            </div>
            <textarea
                className={styles.textContainer}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용"
            />
        </div>
  );
};

export default ExCreateForm;