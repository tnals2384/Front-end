import React, { useState } from 'react';
import styles from '../styles/Write.module.css';
import TagInput from './TagInput';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [jobTags, setJobTags] = useState([]);
    const [abilityTags, setAbilityTags] = useState([]);
    const [stackTags, setStackTags] = useState([]);

    const handleTitleChange = e => {
        setTitle(e.target.value);
    };

    const handleStartDateChange = e => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = e => {
        setEndDate(e.target.value);
    };

    return (
        <div className={styles.postContainer}>
            <div className={styles.postForm}>
                <div className={styles.column}>
                    <div className={styles.label}>제목</div>
                    <input
                        className={styles.inputText}
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="제목을 입력해주세요"
                    />
                </div>
                <div className={styles.column}>
                    <div className={styles.label}>진행 기간</div>
                    <div className={styles.duration}>
                        <div className={styles.date}>
                            <img src="/right.png" alt="오른쪽 화살표" />
                            <input
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                        </div>
                        <div className={styles.date}>
                            <img src="/left.png" alt="왼쪽 화살표" />
                            <input
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                        </div>
                    </div>
                </div>
                <TagInput
                    tags={jobTags}
                    setTags={setJobTags}
                    tagType="관련 직무"
                />
                <TagInput
                    tags={abilityTags}
                    setTags={setAbilityTags}
                    tagType="키워드"
                />
                <TagInput
                    tags={stackTags}
                    setTags={setStackTags}
                    tagType="사용 기술"
                />
            </div>
        </div>
    );
};

export default PostForm;
