import React, { useState } from 'react';

import styles from "../styles/Write.module.css";
const ExperienceForm = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
        <div className={styles.exContainer}>
            <div className={styles.titleContainer}>
            <div className={styles.title}>
             활동을 하게 된 동기를 기록해주세요. 
             </div>
            <button className={styles.deleteButton}>X</button>
            </div>
        <textarea value={text} onChange={handleTextChange} placeholder="내용" />

        </div>
  );
};

export default ExperienceForm;
