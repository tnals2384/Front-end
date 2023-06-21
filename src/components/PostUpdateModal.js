import React from 'react';
import styles from '../styles/Modal.module.css';
import TagInput from './TagInput';


//단일 조회화면에서 Post 정보들을 수정하는 Modal
const PostUpdateModal = ({
    title,
    setTitle,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    jobTags,
    setJobTags,
    abilityTags,
    setAbilityTags,
    stackTags,
    setStackTags,
    onUpdate,
    setModalOpen,
}) => {
    
    // 모달 끄기
    const closeModal = () => {
        // 데이터를 업데이트하고 onUpdate 함수 호출
        const updatedData = {
            title,
            startDate,
            endDate,
            jobTags,
            abilityTags,
            stackTags,
        };
        onUpdate(updatedData);

        setModalOpen(false);
    };

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
            </div>
        </div>
    );
};
export default PostUpdateModal;
