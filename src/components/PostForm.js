import React, { useState } from 'react';
import styles from '../styles/Write.module.css';
function PostForm() {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [jobTags, setJobTags] = useState([]);
    const [abilityTags, setAbilityTags] = useState([]);
    const [stackTags, setStackTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [showTagInput, setShowTagInput] = useState(false);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };
    
      const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    //+ 버튼을 누르면 tagInput 창이 보이도록 함
    const handleToggleTagInput = () => {
        setShowTagInput(!showTagInput);
    };
    
    //tag input이 바뀌면 tagInput값을 저장
    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    //Enter key를 누르면 tag를 추가
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleAddJobTags();
        }
    };

    //Jobtag 저장
    const handleAddJobTags = () => {
        if (tagInput.trim() !== '') {
          setJobTags([...jobTags, tagInput]);
          setTagInput('');
          setShowTagInput(!showTagInput);
        }
    };

    //Job tag 삭제
    const handleRemoveTag = (tag) => {
        const updatedTags = jobTags.filter((t) => t !== tag);
        setJobTags(updatedTags);
    };

    return ( 
        <div>
           <div className={styles.postContainer}>
            <div className={styles.column}>
                <div className={styles.label}>제목</div>
                <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                />
            </div>
            <div className={styles.column}>
                <div className={styles.label}>진행 기간</div>
                <div className={styles.duration}>
                <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.label}>관련 직무</div>
                <button onClick={handleToggleTagInput}>+</button>
                {showTagInput && (
                <div>
                    <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleKeyDown}
                    />
                </div>
                )}
                <ul>
                {jobTags.map((tag, index) => (
                    <li key={index}>
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)}>X</button>
                    </li>
                ))}
                </ul>
            </div>
            </div>
        </div>
        )
};

export default PostForm;