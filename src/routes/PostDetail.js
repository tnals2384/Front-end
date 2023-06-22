import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../styles/Detail.module.css';
import ExperienceContainer from '../components/ExperienceContainer';
import PostUpdateModal from '../components/PostUpdateModal';
import ExCreateForm from '../components/ExCreateForm';
const PostDetail = ({ posts }) => {
    //url 파라미터로 id 찾아옴
    const { id } = useParams();
    const post = posts.find(post => post.id === Number(id));

    //modal
    const [modalOpen, setModalOpen] = useState(false);

    //post
    const [title, setTitle] = useState(post.title);
    const [startDate, setStartDate] = useState(post.startDate);
    const [endDate, setEndDate] = useState(post.endDate);
    const [jobTags, setJobTags] = useState(post.tags['관련 직무']);
    const [abilityTags, setAbilityTags] = useState(post.tags['핵심 역량']);
    const [stackTags, setStackTags] = useState(post.tags['사용한 기술']);

    //experience
    const [experiences, setExperiences] = useState([
        {
            experienceId: 1,
            title: '활동을 하게 된 동기를 기록해주세요.',
            content: 'Content 1',
        },
        {
            experienceId: 2,
            title: '맡은 역할과 수행 내용을 기록해주세요.',
            content: 'Content 2',
        },
        // ... 다른 experiences 데이터
    ]);

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
    
    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    // 업데이트 핸들러
    const handleUpdate = updatedData => {
        setTitle(updatedData.title); // title 상태 업데이트 예시
        setStartDate(updatedData.startDate);
        setEndDate(updatedData.endDate);
        setJobTags(updatedData.jobTags);
        setAbilityTags(updatedData.abilityTags);
        setStackTags(updatedData.stackTags);
    };

    //file
    const fileInput = React.useRef(null);
    const [selectedFiles, setSelectedFiles] = useState(post.file);

    const handleFileChange = event => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };
    const handleButtonClick = e => {
        fileInput.current.click();
    };

    //id로 post를 찾지 못했을 때
    if (!post) {
        return <div>글을 찾을 수 없습니다.</div>;
    }

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
                            <img
                                src="/setting.png"
                                alt="세팅 이미지"
                                className={styles.setting}
                                onClick={showModal}
                            />
                            {modalOpen && (
                                <PostUpdateModal
                                    title={title}
                                    setTitle={setTitle}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                    jobTags={jobTags}
                                    setJobTags={setJobTags}
                                    abilityTags={abilityTags}
                                    setAbilityTags={setAbilityTags}
                                    stackTags={stackTags}
                                    setStackTags={setStackTags}
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
                            {selectedFiles.map((file, index) => {
                                if (file.type === 'image/png') {
                                    return (
                                        <div
                                            key={index}
                                            className={styles.fileContainer}
                                        >
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                className={styles.image}
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            key={index}
                                            className={styles.fileContainer}
                                        >
                                            {file.name}
                                        </div>
                                    );
                                }
                            })}
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
