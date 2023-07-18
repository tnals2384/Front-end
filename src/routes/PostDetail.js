import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../styles/Detail.module.css';
import ExperienceContainer from '../components/ExperienceContainer';
import PostUpdateModal from '../components/PostUpdateModal';
import ExCreateForm from '../components/ExCreateForm';
import { getPost, updatePost, deletePost } from '../apis/PostAPI'; // PostAPI에서 함수를 import
import { addExperience, updateExperience, deleteExperience } from '../apis/ExperienceAPI'; // ExperienceAPI에서 함수를 import
import { uploadFiles, deleteFile, getFiles } from '../apis/FileAPI'; // FileAPI에서 함수를 import

const PostDetail = () => {

    //url 파라미터로 id 찾아옴
    const { postId } = useParams();
    const navigate = useNavigate();
    //post
    const [post, setPost] = useState({
        title: '',
        startDate: '',
        endDate: '',
        jobTags: [],
        abilityTags: [],
        stackTags: [],
      });

    //experience
    const [experiences, setExperiences] = useState([]);
    //file
    const fileInput = React.useRef(null);
    const [files,setFiles] = useState([]);


    //modal
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };
    
    //api get요청으로 orderBy에 따라 posts목록 받아오기
    useEffect(() => {
        getPost(postId)
          .then((data) => {
            if (data) {
                const { getExperienceResponses, getTagResponses, getFileResponses } = data;
                
                // 경험 데이터 추출
                const experiences = getExperienceResponses;

                // 태그 데이터 추출
                const jobTags = getTagResponses.find(tag => tag.tagType === "JOB")?.tagName || [];
                const abilityTags = getTagResponses.find(tag => tag.tagType === "ABILITY")?.tagName || [];
                const stackTags = getTagResponses.find(tag => tag.tagType === "STACK")?.tagName || [];


                // 파일 데이터 추출
                const files = getFileResponses;

                setPost({
                    title: data.title,
                    startDate: data.beginAt,
                    endDate: data.finishAt,
                    jobTags: jobTags,
                    abilityTags: abilityTags,
                    stackTags: stackTags,
                });

                setExperiences(experiences);
                setFiles(files);
            }
            })
            .catch((error) => {
                console.error('게시물 데이터를 가져오는 동안 오류가 발생했습니다.', error);
            });
        },[postId]
    );
        
    // 게시물 삭제 API 요청 함수 호출
    const handleDeleteClick = (postId) => {
        deletePost(postId)
        .then((data) => {
            console.log(data);
            // 성공적으로 삭제 요청을 처리한 경우, 필요한 작업 수행
            navigate('/');
        })
        .catch((error) => {
            console.error('게시물 삭제 중 오류가 발생했습니다.', error);
        });
    };

    // 게시물 업데이트 API 요청 함수 호출
    const handleUpdate = (updatedData) => {
        setPost((prevPost) => ({
            ...prevPost,
            title: updatedData.title,
            startDate: updatedData.startDate,
            endDate: updatedData.endDate,
            jobTags: updatedData.jobTags,
            abilityTags: updatedData.abilityTags,
            stackTags: updatedData.stackTags,
        }));

        updatePost(postId, updatedData)
        .then((data) => {
            console.log(data);
            // 성공적으로 업데이트 요청을 처리한 경우, 필요한 작업 수행
        })
        .catch((error) => {
            console.error('게시물 업데이트 중 오류가 발생했습니다.', error);
        });
    };


    //경험 추가 form 보이기
    const [showForm, setShowForm] = useState(false);

    // 경험 추가
    const handleAddExperience = (newExperience) => {
        addExperience(postId, newExperience)
        .then((data) => {
            if (data) {
            const newEx = {
                experienceId: data.experienceId,
                title: newExperience.title,
                content: newExperience.content,
            };
            setExperiences((prevExperiences) => [...prevExperiences, newEx]);
            }
        })
        .catch((error) => {
            console.error('경험 추가 중 오류가 발생했습니다.', error);
        });
        setShowForm(false);
    };
    
    // 경험 업데이트
    const handleUpdateExperience = (updateEx) => {
        const experienceId = updateEx.experienceId;
        const updatedExperiences = experiences.map((experience) => {
        if (experience.experienceId === experienceId) {
            return {
            ...experience,
            title: updateEx.title,
            content: updateEx.content,
            };
        }
        return experience;
        });

        setExperiences(updatedExperiences);

        updateExperience(experienceId, updateEx)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('경험 업데이트 중 오류가 발생했습니다.', error);
        });
        setShowForm(false);
    };


    // 경험 삭제
    const handleDeleteExperience = (experienceId) => {
        const updatedExperiences = experiences.filter((experience) => experience.experienceId !== experienceId);
        setExperiences(updatedExperiences);

        deleteExperience(experienceId)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('경험 삭제 중 오류가 발생했습니다.', error);
        });
    };

    // 파일 업로드 버튼을 누를 경우
    const handleButtonClick = () => {
        fileInput.current.click();
    };
    
    // 파일 추가
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        uploadFiles(postId, selectedFiles)
            .then((data) => {
            if (data) {
                // 파일 목록 다시 가져오기
                getFiles(postId)
                .then((files) => {
                setFiles(files);
                })
                .catch((error) => {
                console.error('파일 목록을 가져오는 중 오류가 발생했습니다.', error);
                });
            }
            })
            .catch((error) => {
            console.error('파일 업로드 중 오류가 발생했습니다.', error);
        });
    };

    // 파일 삭제
    const handleDeleteFile = (fileId) => {
        const updatedFiles = files.filter((file) => file.fileId !== fileId);
        setFiles(updatedFiles);

        deleteFile(fileId)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('파일 삭제 중 오류가 발생했습니다.', error);
        });
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
                            <h1 className={styles.title}>{post.title}</h1>
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
                                   initData={post}
                                    onUpdate={handleUpdate}
                                    setModalOpen={setModalOpen}
                                />
                            )}
                        </div>
                        <span className={styles.duration}>
                            {post.startDate} ~ {post.endDate}
                        </span>
                        <div className={styles.tagColumn}>
                            <strong className={styles.label}>관련 직무</strong>
                            <ul className={styles.tagContainer}>
                                {post.jobTags.map(tag => (
                                    <li className={styles.tag} key={tag}>
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.tagColumn}>
                            <strong className={styles.label}>핵심 역량</strong>
                            <ul className={styles.tagContainer}>
                                {post.abilityTags.map(tag => (
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
                                {post.stackTags.map(tag => (
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
                            experience={experience}
                            onUpdate={handleUpdateExperience}
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
                            onAddExperience={handleAddExperience}
                        />
                    )}


                    <div className={styles.exContainer}>
                        <div className={styles.fileList}>
                        {files.map((file, index) => {
                            if (file.filePath.endsWith('.png') || file.filePath.endsWith('.jpg') || file.filePath.endsWith('.jpeg') || file.filePath.endsWith('.gif')) {
                            return (
                                <div
                                key={index}
                                className={styles.fileContainer}
                                >
                                <div className={styles.buttonContainer}>
                                    <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDeleteFile(file.fileId)}
                                    >
                                    <span>삭제</span>
                                    </button>
                                </div>
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
                                <div className={styles.buttonContainer}>
                                    <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDeleteFile(file.fileId)}
                                    >
                                    <span>삭제</span>
                                    </button>
                                </div>
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
                    <div className={styles.add}>
                            파일 추가하기
                            <button
                            className={styles.addButton}
                            onClick={handleButtonClick}
                            >
                            <input
                            id="file-upload"
                            type="file"
                            ref={fileInput}
                            multiple={true}
                            onChange={handleFileChange}
                            className={styles.addButton}
                            style={{ display: 'none' }}
                            />
                            +
                            </button>
                        </div>

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
