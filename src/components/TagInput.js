import React, {useState, useRef, useEffect } from 'react';
import styles from '../styles/Write.module.css';

const TagInput = ({tags, setTags, tagType}) => {
    
    const [tagInput, setTagInput] = useState('');
    const [showTagInput, setShowTagInput] = useState(false);
    const inputRef = useRef(null); // 입력 창에 대한 참조 생성

    useEffect(() => {
        if (showTagInput && inputRef.current) {
          inputRef.current.focus(); // 입력 창에 포커스 설정
        }
      }, [showTagInput]);
    
      // + 버튼을 누르면 tagInput 창이 뜨고 focus가 가도록 함
      const handleToggleTagInput = () => {
        setShowTagInput(!showTagInput);
        if (!showTagInput) {
          setTagInput('');
        }
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

    //tag 저장
    const handleAddTags = () => {
        if (tagInput.trim() !== '') {
            setTags([...tags, tagInput]);
            setTagInput('');

        }
    };
    
        //tag 삭제
        const handleRemoveTag = (tag) => {
            const updatedTags = tags.filter((t) => t !== tag);
            setTags(updatedTags);
        };
    
    return (
        <div className={styles.column}>
            <div className={styles.label}>{tagType}</div>
            <div>
                <div className={styles.tagContainer}>
                    {tags.map((tag, index) => (
                    <div key={index} className={styles.tagItem}>
                        <span className={styles.tag}>{tag}</span>
                        <button
                        className={styles.removeButton}
                        onClick={() => handleRemoveTag(tag)}
                        >
                        &times;
                        </button>
                    </div>
                    ))}
                {showTagInput && (
                    <input className={styles.inputText}
                        type="text"
                        value={tagInput}
                        ref={inputRef} 
                        onChange={handleTagInputChange}
                        onKeyDown={handleKeyDown}
                    />
                )}
                {!showTagInput && (
                    <button className={styles.addButton} onClick={handleToggleTagInput}>
                    +
                    </button>
                )}
                </div>
            </div>
    </div>
    );
};

export default TagInput;