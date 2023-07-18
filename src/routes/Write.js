import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import PostForm from '../components/PostForm';
import ExperienceForm from '../components/ExperienceForm';
import styles from '../styles/Write.module.css';
import {createPost } from '../apis/PostAPI';

const Write = () => {
    const navigate = useNavigate();

    //제목, 기간, tag
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [jobTags, setJobTags] = useState([]);
    const [abilityTags, setAbilityTags] = useState([]);
    const [stackTags, setStackTags] = useState([]);

    //experiences 기본 질문 4개
    const [experiences, setExperiences] = useState([
        { title: '활동을 하게 된 동기를 기록해주세요.', content: '' },
        { title: '맡은 역할과 수행 내용을 기록해주세요.', content: '' },
        { title: '힘들었던 점이 있었나요? 어떻게 극복하였나요?', content: '' },
        { title: '느낀점 및 배운점을 기록해주세요.', content: '' },
    ]);

    // ExperienceForm 삭제
    const handleRemoveExperience = index => {
        const newExperiences = [...experiences];
        newExperiences.splice(index, 1);
        setExperiences(newExperiences);
    };

    //ExperienceForm 추가
    const handleAddExperience = e => {
        e.preventDefault();
        setExperiences([...experiences, { title: '', content: '' }]);
    };
    
    //experience 변경 내용 저장
    const handleSaveExperience = (index, experience) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = experience;
    setExperiences(updatedExperiences);
    };

    //파일 첨부
    const fileInput = React.useRef(null);

    //선택된 파일
    const [selectedFiles, setSelectedFiles] = useState([]);


    //file 추가 버튼을 누를경우
    const handleButtonClick = e => {
        e.preventDefault();
        fileInput.current.click();
    };
        
    //파일을 추가할 경우
    const handleFileChange = e => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, ...files]);
    };

    //선택 파일을 선택 해제할 경우
    const removeFile = index => {
        setSelectedFiles(prevSelectedFiles => {
        const updatedFiles = [...prevSelectedFiles];
        updatedFiles.splice(index, 1);
        return updatedFiles;
        });
    };


    // 전체 form 제출
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await createPost(
            {
            title: title,
            startDate: startDate,
            endDate: endDate,
            jobTags: jobTags,
            abilityTags: abilityTags,
            stackTags: stackTags,
            experiences: experiences,
            },
            selectedFiles
        );
        
        console.log(response); // 서버로부터의 응답 데이터
        // postId 추출
        const postId = response.result.postId;
        console.log('postId:', postId);

        // postId를 사용하여 navigate
        navigate(`/posts/${postId}`);
        } catch (error) {
        console.error('create post 요청 중 오류가 발생했습니다.', error);
        }
    };


    return (
        <div>
            <div className={styles.fixedHeader}>
                <Header />
                <h1>소중한 경험을 기록해주세요 🥳</h1>
            </div>
            <div className={styles.writeContainer}>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <PostForm title={title} setTitle={setTitle}
                            startDate={startDate} setStartDate={setStartDate}
                            endDate={endDate} setEndDate={setEndDate}
                            jobTags={jobTags} setJobTags={setJobTags}
                            abilityTags={abilityTags} setAbilityTags={setAbilityTags}
                            stackTags={stackTags} setStackTags={setStackTags}
                             />
                    {experiences.map((experience, index) => (
                        <ExperienceForm
                            onSave={experience => handleSaveExperience(index, experience)}
                            key={index}
                            title={experience.title}
                            onRemove={() => handleRemoveExperience(index)}
                        />
                    ))}
                    <div className={styles.add}>
                        내용 추가하기
                        <button
                            className={styles.addButton}
                            onClick={handleAddExperience}
                        >
                            +
                        </button>
                    </div>

                    <div className={styles.add}>
                        {' '}
                        파일 첨부하기
                        <button
                            className={styles.addButton}
                            onClick={handleButtonClick}
                        >
                            +
                        </button>
                        <input
                            id="file-upload"
                            type="file"
                            ref={fileInput}
                            multiple={true}
                            onChange={handleFileChange}
                            className={styles.addButton}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {selectedFiles.length > 0 && (
                        <div className={styles.fileList}>
                            {selectedFiles.map((file, index) => ( 
                                <div key={index} className={styles.fileItem}>
                                    {file.type.includes('image/') && (
                                       <div>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                className={styles.image}
                                            />
                                            <div className={styles.fileName}>{file.name}</div>
                                        </div>
                                    )}
                                    {!file.type.includes('image/') && (
                                        <div className={styles.fileName}>{file.name}</div>
                                    )}
                                    <button
                                        className={styles.fileRemoveButton}
                                        onClick={() => removeFile(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button className={styles.writeButton} type="submit">글쓰기</button>
                    <div className={styles.last}>PODA</div>
                </form>
            </div>
        </div>
    );
};

export default Write;
