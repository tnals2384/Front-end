import React, { useState} from 'react';
import Header from '../components/Header';
import PostForm from '../components/PostForm';
import ExperienceForm from '../components/ExperienceForm';
import styles from '../styles/Write.module.css';
import axios from 'axios';
const Write = () => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [jobTags, setJobTags] = useState([]);
    const [abilityTags, setAbilityTags] = useState([]);
    const [stackTags, setStackTags] = useState([]);

    
    const fileInput = React.useRef(null);

    const [showAddButton, setShowAddButton] = useState(true);
    const [experiences, setExperiences] = useState([
        { title: '활동을 하게 된 동기를 기록해주세요.', content: '' },
        { title: '맡은 역할과 수행 내용을 기록해주세요.', content: '' },
        { title: '힘들었던 점이 있었나요? 어떻게 극복하였나요?', content: '' },
        { title: '느낀점 및 배운점을 기록해주세요.', content: '' },
      ]);

    //expereince update
    const handleSaveExperience = (index, experience) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = experience;
    setExperiences(updatedExperiences);
    };


    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tags = 
            [  
                {
                tagType: 'Job',
                tagName: jobTags
                },
                {
                    tagType: 'Stack',
                    tagName: stackTags
                },
                {
                    tagType: 'Ability',
                    tagName: abilityTags
                }
            ];
        
        const createPostRequest = new FormData();

        createPostRequest.append('title', title);
        createPostRequest.append('beginAt', startDate+"T12:00:00");
        createPostRequest.append('finishAt', endDate+"T12:00:00");
        createPostRequest.append('tags', JSON.stringify(tags));
        
        const experiencesObj = {};
        experiences.forEach(experience => {
            experiencesObj[experience.title] = experience.content;
        });
        createPostRequest.append('experiences', JSON.stringify(experiencesObj));

        const formDataEntries = createPostRequest.entries();
        for (const [key, value] of formDataEntries) {
        console.log(key, value);
        }

        try {
            const response = await axios.post('/api/v1/posts', createPostRequest, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                  }
            });
            
            console.log(response.data); // 서버로부터의 응답 데이터
        } catch (error) {
            console.error(error.response);
        }
    };

    const handleFileChange = event => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };

    const handleButtonClick = e => {
        fileInput.current.click();
    };

    // ExperienceForm 삭제
    const handleRemoveExperience = index => {
        const newExperiences = [...experiences];
        newExperiences.splice(index, 1);
        setExperiences(newExperiences);
    };

    const handleAddExperience = () => {
        setExperiences([...experiences, { title: '', content: '' }]);
        setShowAddButton(true);
    };

    return (
        <div>
            <div className={styles.fixedHeader}>
                <Header />
                <h1>소중한 경험을 기록해주세요 🥳</h1>
            </div>
            <div className={styles.writeContainer}>
                <div className={styles.formContainer}>
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
                    {showAddButton && (
                        <div className={styles.add}>
                            내용 추가하기
                            <button
                                className={styles.addButton}
                                onClick={handleAddExperience}
                            >
                                +
                            </button>
                        </div>
                    )}

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
                                    {file.name}
                                </div>
                            ))}
                        </div>
                    )}

                    <button className={styles.writeButton} onClick={handleSubmit}>글쓰기</button>
                    <div className={styles.last}>PODA</div>
                </div>
            </div>
        </div>
    );
};

export default Write;
