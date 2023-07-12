import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../styles/Detail.module.css';
import ExperienceContainer from '../components/ExperienceContainer';
import PostUpdateModal from '../components/PostUpdateModal';
import ExCreateForm from '../components/ExCreateForm';
const PostDetail = () => {
    //url 파라미터로 id 찾아옴
    const { postId } = useParams();
    const navigate = useNavigate();
    //post
  
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [jobTags, setJobTags] = useState([]);
    const [abilityTags, setAbilityTags] = useState([]);
    const [stackTags, setStackTags] = useState([]);

    //experience
    const [experiences, setExperiences] = useState([]);
    //file
    const fileInput = React.useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);


    //api get요청으로 orderBy에 따라 posts목록 받아오기
    useEffect(() => {
        fetch(`/api/v1/posts/${postId}`)
            .then(response => response.json())
            .then(data => {
                const { getExperienceResponses, getTagResponses, getFileResponses } = data.result;
                
                setTitle(data.result.title);
                setStartDate(data.result.beginAt);
                setEndDate(data.result.finishAt);
                // 경험 데이터 추출
                const experiences = getExperienceResponses.map(experience => ({
                    experienceId: experience.experienceId,
                    title: experience.title,
                    content: experience.content
                }));

                // 태그 데이터 추출
                const jobTags = getTagResponses.find(tag => tag.tagType === "JOB")?.tagName || [];
                const abilityTags = getTagResponses.find(tag => tag.tagType === "ABILITY")?.tagName || [];
                const stackTags = getTagResponses.find(tag => tag.tagType === "STACK")?.tagName || [];

                // 파일 데이터 추출
                const files = getFileResponses.map(file => ({
                    fileName: file.fileName,
                    filePath: file.filePath
                }));

                // 추출한 데이터를 상태에 설정
                setExperiences(experiences);
                setJobTags(jobTags);
                setAbilityTags(abilityTags);
                setStackTags(stackTags);
                setSelectedFiles(files);
            })
            .catch(error => {
            console.error('post 데이터를 가져오는 동안 오류가 발생했습니다.', error);
            });
        },[postId]
    );
        
    const deletePost = async (postId) => {
        try {
          const response = await fetch(`/api/v1/posts/${postId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          // 삭제에 대한 응답 처리
          console.log(data);
        } catch (error) {
          console.error('게시물 삭제 중 오류가 발생했습니다.', error);
        }
    };

    //삭제
    const handleDeleteClick = (postId) => {
        deletePost(postId);
        navigate('/');
    };

    //modal
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    //api에 post update 요청
    const updatePost = async (postId, updatedData) => {
         //createTagRequest 형식에 맞춤
         const tags = [  
            {
                tagType: 'Job',
                tagName: updatedData.jobTags
            },
            {
                tagType: 'Stack',
                tagName: updatedData.stackTags
            },
            {
                tagType: 'Ability',
                tagName: updatedData.abilityTags
            }
        ];
        
        // 필드가 비어있는지 확인
        if (updatedData.startDate === '' || updatedData.endDate === '') {
            alert('기간을 선택해주세요.'); 
            return;
        }
        //createPostRequst Dto 형식에 맞춤
        const updatePostRequest = {
            title : updatedData.title,
            beginAt : updatedData.startDate+"T12:00:00",
            finishAt : updatedData.endDate+"T12:00:00",
            tags : tags,
        }
        //formData에 추가
        const formData = new FormData();
        formData.append('updatePostRequest', new Blob([JSON.stringify(updatePostRequest)], {type: "application/json"}));

        try {
            const response = await fetch(`/api/v1/posts/${postId}`, {
                method: 'PUT',
                body: formData,
            });
            const data = await response.json();
            // 업데이트에 대한 응답 처리
            console.log(data);
        } catch (error) {
            console.error('게시물 업데이트 중 오류가 발생했습니다.', error);
        }
    };

    //postUPdateModal에 전달해줄 초기 데이터
    const initData = {
        title: title,
        startDate: startDate,
        endDate: endDate,
        jobTags: jobTags,
        abilityTags: abilityTags,
        stackTags: stackTags
    }

    // 업데이트 핸들러
    const handleUpdate = updatedData => {
        setTitle(updatedData.title); // title 상태 업데이트 예시
        setStartDate(updatedData.startDate);
        setEndDate(updatedData.endDate);
        setJobTags(updatedData.jobTags);
        setAbilityTags(updatedData.abilityTags);
        setStackTags(updatedData.stackTags);

        updatePost(postId,updatedData);
    };


    
    //경험 추가 form 보이기
    const [showForm, setShowForm] = useState(false);

    //경험 추가
    const handleAddExperience = newExperience => {
        setExperiences([...experiences, newExperience]);
        setShowForm(false);
    };

    //경험 삭제
    const handleDeleteExperience = experienceId => {
        const updatedExperiences = experiences.filter(
            experience => experience.experienceId !== experienceId,
        );
        setExperiences(updatedExperiences);
    };

    const handleFileChange = event => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };
    const handleButtonClick = e => {
        fileInput.current.click();
    };

    const handleDeleteFile = () => {
        setSelectedFiles([]);
    };



    return (
        <div>
            <div className={styles.fixedHeader}>
                <Header />
            </div>
            <div className={styles.container}>
                <div className={styles.postContainer}>
                    <div className={styles.postInfo}>
                        <div className={styles.titleLine}>
                            <h1 className={styles.title}>{title}</h1>
                            <button
                                className={styles.postDelete}
                                onClick={() => handleDeleteClick(postId)}
                            >
                                글 삭제
                            </button>
                            <img
                                src="/setting.png"
                                alt="세팅 이미지"
                                className={styles.setting}
                                onClick={showModal}
                            />
                            {modalOpen && (
                                <PostUpdateModal
                                   initData={initData}
                                    onUpdate={handleUpdate}
                                    setModalOpen={setModalOpen}
                                />
                            )}
                        </div>
                        <span className={styles.duration}>
                            {startDate} ~ {endDate}
                        </span>
                        <div className={styles.tagColumn}>
                            <strong className={styles.label}>관련 직무</strong>
                            <ul className={styles.tagContainer}>
                                {jobTags.map(tag => (
                                    <li className={styles.tag} key={tag}>
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.tagColumn}>
                            <strong className={styles.label}>핵심 역량</strong>
                            <ul className={styles.tagContainer}>
                                {abilityTags.map(tag => (
                                    <li className={styles.tag} key={tag}>
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.tagColumn}>
                            <strong className={styles.label}>
                                사용한 기술
                            </strong>
                            <ul className={styles.tagContainer}>
                                {stackTags.map(tag => (
                                    <li className={styles.tag} key={tag}>
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {experiences.map(experience => (
                        <ExperienceContainer
                            key={experience.experienceId}
                            experienceId={experience.experienceId}
                            title={experience.title}
                            content={experience.content}
                            onDelete={handleDeleteExperience}
                        />
                    ))}
                    {!showForm ? (
                        <div className={styles.add}>
                            내용 추가하기
                            <button
                                className={styles.addButton}
                                onClick={() => setShowForm(!showForm)}
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <ExCreateForm
                            experiences={experiences}
                            setExperiences={setExperiences}
                            onAddExperience={handleAddExperience}
                        />
                    )}

                    {selectedFiles.length > 0 ? (
                    <div className={styles.exContainer}>
                        <div className={styles.titleContainer}>
                            <div className={styles.exTitle}>파일</div>
                            <div className={styles.buttonContainer}>
                                <button
                                className={styles.deleteButton}
                                onClick={handleDeleteFile}
                                >
                                <span>삭제</span>
                                </button>
                                <button
                                className={styles.updateButton}
                                onClick={handleButtonClick}
                                >
                                수정
                                </button>
                                <input
                                id="file-upload"
                                type="file"
                                ref={fileInput}
                                multiple={true}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                />
                            </div>
                        </div>

                        <div className={styles.fileList}>
                        {selectedFiles.map((file, index) => {
                            if (file.filePath.endsWith('.png') || file.filePath.endsWith('.jpg') || file.filePath.endsWith('.jpeg') || file.filePath.endsWith('.gif')) {
                            return (
                                <div
                                key={index}
                                className={styles.fileContainer}
                                >
                                <img
                                    src={file.filePath}
                                    alt={file.fileName}
                                    className={styles.image}
                                />
                                <div className={styles.fileName}>{file.fileName}</div>
                                </div>
                            );
                            } else {
                            return (
                                <div
                                key={index}
                                className={styles.fileContainer}
                                >
                                <a
                                    href={file.filePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.fileName}
                                >
                                    {file.fileName}
                                </a>
                                </div>
                            );
                            }
                        })}
                        </div>
                    </div>
                    ) : (
                    <div className={styles.add}>
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
                    )}

                    <a
                        href="https://www.flaticon.com/kr/free-icons/"
                        title="기어 아이콘"
                    >
                        기어 아이콘 제작자: Freepik - Flaticon
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
