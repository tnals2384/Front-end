import React, {useState} from 'react';
import styles from '../styles/Modal.module.css';
import TagInput from './TagInput';


//단일 조회화면에서 Post 정보들을 수정하는 Modal
const PostUpdateModal = ({
    initData,
    onUpdate,
    setModalOpen }) => {
    
    const [updatedData, setUpdatedData] = useState(initData);

    // 모달 끄기
    const closeModal = () => {
      onUpdate(updatedData);
      setModalOpen(false);
    };
  

    //수정된 field만 업데이트
    const handleInputChange = (field, value) => {
      setUpdatedData(prevData => ({
        ...prevData,
        [field]: value,
      }));
    };
  

    return (
        <div className={styles.modalBox}>
            <div className={styles.container}>
                <button className={styles.close} onClick={closeModal}>
                    저장
                </button>
                <div className={styles.postContainer}>
                    <div className={styles.postForm}>
                        <div className={styles.column}>
                            <div className={styles.label}>제목</div>
                            <input
                                className={styles.inputText}
                                type="text"
                                value={updatedData.title}
                                required
                                onChange={e => handleInputChange('title', e.target.value)}
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
                                        value={updatedData.startDate}
                                        onChange={e => handleInputChange('startDate', e.target.value)}
                                    />
                                </div>
                                <div className={styles.date}>
                                    <img src="/left.png" alt="왼쪽 화살표" />
                                    <input
                                        type="date"
                                        value={updatedData.endDate}
                                        onChange={e => handleInputChange('endDate', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <TagInput
                            tags={updatedData.jobTags}
                            setTags={tags => handleInputChange('jobTags', tags)}
                            tagType="관련 직무"
                        />
                        <TagInput
                            tags={updatedData.abilityTags}
                            setTags={tags => handleInputChange('abilityTags', tags)}
                            tagType="핵심 역량"
                        />
                        <TagInput
                            tags={updatedData.stackTags}
                            setTags={tags => handleInputChange('stackTags', tags)}
                            tagType="사용한 기술"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PostUpdateModal;
