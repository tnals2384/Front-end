import React, { useState } from 'react';
import styles from '../styles/Detail.module.css';
import ExUpdateForm from './ExUpdateForm';


//단일 experience를 담은 container
const ExperienceContainer = ({ experienceId, title, content,onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [exTitle, setExTitle] = useState(title);
    const [exContent, setExContent] = useState(content);


    //수정버튼 눌렀을 때
    const handleEditClick = () => {
        setIsEditing(true);
    };

    //저장버튼 눌렀을 때
    const handleSaveClick = () => {
        setIsEditing(false);
    };
    //삭제
    const handleDeleteClick = () => {
        onDelete(experienceId);
      };
    

    return (
        <div style={{ width: '100%' }}>
            {isEditing ? (
                <ExUpdateForm
                    title={exTitle}
                    setTitle={setExTitle}
                    content={exContent}
                    setContent={setExContent}
                    onUpdate={handleSaveClick}
                />
            ) : (
                <div className={styles.exContainer}>
                    <div className={styles.titleContainer}>
                        <div className={styles.titleCharacterContainer}>
                            <div className={styles.exTitle}>{exTitle}</div>
                            <div className={styles.characterCount}>
                                {exContent.length}자
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                        <button className={styles.deleteButton} onClick={handleDeleteClick}>
                                <span>삭제</span>
                        </button>
                        <button
                            className={styles.updateButton}
                            onClick={handleEditClick}
                        >
                            <span>수정</span>
                        </button>
                        </div>
                    </div>
                    <div className={styles.textContainer}>{exContent}</div>
                </div>
            )}
        </div>
    );
};

export default ExperienceContainer;
