import React,{useState} from 'react';

import styles from '../../styles/Detail.module.css';


//단일조회에서 exprience update를 위한 form
const ExUpdateForm = ({ expereince, onUpdate }) => {
    const [title, setTitle] = useState(expereince.title);
    const [content, setContent] = useState(expereince.content);
  
  
    const characterCount = content.length;

    const handleUpdate = () => {
        const updateExperience = {
          experienceId: expereince.experienceId,
          title: title,
          content: content,
        };
        
        onUpdate(updateExperience);
        setTitle('');
        setContent('');
      };

    return (
        <div className={styles.exContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.titleCharacterContainer}>
                    <input
                        className={styles.inputTitle}
                        type="text"
                        placeholder="제목을 입력하세요"
                        onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용"
            />
        </div>
    );
};

export default ExUpdateForm;
