import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../styles/Detail.module.css';
import ExperienceList from '../components/Experience/ExperienceList';
import PostInfo from '../components/Post/PostInfo';
import FileList from '../components/File/FileList';
import FileUploader from '../components/File/FileUploader';
import { getPost, updatePost, deletePost } from '../apis/PostAPI'; // PostAPI에서 함수를 import
import { addExperience, updateExperience, deleteExperience } from '../apis/ExperienceAPI'; // ExperienceAPI에서 함수를 import
import { uploadFiles, deleteFile, getFiles } from '../apis/FileAPI'; // FileAPI에서 함수를 import

const PostDetail = () => {

    //url 파라미터로 id 찾아옴
    const { postId } = useParams();
    const navigate = useNavigate();

    //postInfo
    const [post, setPost] = useState({
        title: '',
        startDate: '',
        endDate: '',
        jobTags: [],
        abilityTags: [],
        stackTags: [],
      });
    //experiences
    const [experiences, setExperiences] = useState([]);
    //files
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


    // 파일 추가
    const handleFileChange = (selectedFiles) => {
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
                    <PostInfo
                        post={post}
                        postId={postId}
                        onDeleteClick={handleDeleteClick}
                        onSettingsClick={showModal}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        handleUpdate={handleUpdate}
                    />

                    <ExperienceList
                        experiences={experiences}
                        onAddExperience={handleAddExperience}
                        onUpdateExperience={handleUpdateExperience}
                        onDeleteExperience={handleDeleteExperience}
                    />

                    <FileList files={files} onDeleteFile={handleDeleteFile} />
                    <FileUploader onFileChange={handleFileChange} />
                    
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
