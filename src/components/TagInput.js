import React, {useState } from 'react';
import styles from '../styles/Write.module.css';

const TagInput = ({tags, setTags, tagType}) => {
    
    const [tagInput, setTagInput] = useState('');
    const [showTagInput, setShowTagInput] = useState(false);

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
            handleAddTags();
            setShowTagInput(!showTagInput);
        }
    };

    //Jobtag 저장
    const handleAddTags = () => {
        if (tagInput.trim() !== '') {
            setTags([...tags, tagInput]);
            setTagInput('');

        }
    };
    
        //Job tag 삭제
        const handleRemoveTag = (tag) => {
            const updatedTags = tags.filter((t) => t !== tag);
            setTags(updatedTags);
        };
    
    return (
        <div>
            <div className={styles.label}>{tagType}</div>
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
            {tags.map((tag, index) => (
                <li key={index}>
                {tag}
                <button onClick={() => handleRemoveTag(tag)}>X</button>
                </li>
            ))}
            </ul>
    </div>
    );
};

export default TagInput;