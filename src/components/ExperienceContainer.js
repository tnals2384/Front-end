import React, { useState } from 'react';
import styles from '../styles/Detail.module.css';
import ExUpdateForm from './ExUpdateForm';

//단일 experience를 담은 container
const ExperienceContainer = ({ experience,onUpdate,onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);

    //수정버튼 눌렀을 때
    const handleEditClick = () => {
        setIsEditing(true);
    };

    //저장버튼 눌렀을 때
    const handleSaveClick = (updateExperience) => {
        onUpdate(updateExperience);
        setIsEditing(false);
    };
    //삭제
    const handleDeleteClick = () => {
        onDelete(experience.experienceId);
    };

    return (
        <div style={{ width: '100%' }}>
            {isEditing ? (
                <ExUpdateForm
                    expereince={experience}
                    onUpdate={handleSaveClick}
                />
            ) : (
                <div className={styles.exContainer}>
                    <div className={styles.titleContainer}>
                        <div className={styles.titleCharacterContainer}>
                            <div className={styles.exTitle}>{experience.title}</div>
                            <div className={styles.characterCount}>
                                {experience.content.length}자
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.deleteButton}
                                onClick={handleDeleteClick}
                            >
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
                    <div className={styles.textContainer}>{experience.content}</div>
                </div>
            )}
        </div>
    );
};

export default ExperienceContainer;
