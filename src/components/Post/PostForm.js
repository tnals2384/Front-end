import styles from '../../styles/Write.module.css';
import TagInput from '../Tag/TagInput';

const PostForm = ({post,setPost}) => {
    
    const { title, startDate, endDate } = post;

    const handleTitleChange = e => {
        // post 상태의 title 변경
        setPost(prevPost => ({ ...prevPost, title: e.target.value }));
    };

    const handleStartDateChange = e => {
        // post 상태의 startDate 변경
        setPost(prevPost => ({ ...prevPost, startDate: e.target.value }));
    };

    const handleEndDateChange = e => {
        // post 상태의 endDate 변경
        setPost(prevPost => ({ ...prevPost, endDate: e.target.value }));
    };

    return (
        <div className={styles.postContainer}>
            <div className={styles.postForm}>
                <div className={styles.column}>
                    <div className={styles.label}>제목</div>
                    <input
                        className={styles.inputText}
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        required
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
                                required
                            />
                        </div>
                        <div className={styles.date}>
                            <img src="/left.png" alt="왼쪽 화살표" />
                            <input
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <TagInput
                    tags={post.jobTags}
                    setTags={tags => setPost(prevPost => ({ ...prevPost, jobTags: tags }))}
                    tagType="관련 직무"
                />
                <TagInput
                    tags={post.abilityTags}
                    setTags={tags => setPost(prevPost => ({ ...prevPost, abilityTags: tags }))}
                    tagType="핵심 역량"
                />
                <TagInput
                    tags={post.stackTags}
                    setTags={tags => setPost(prevPost => ({ ...prevPost, stackTags: tags }))}
                    tagType="사용 기술"
                />
            </div>
        </div>
    );
};

export default PostForm;
