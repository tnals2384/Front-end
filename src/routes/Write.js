import React, {useState,useRef} from 'react'
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import ExperienceForm from '../components/ExperienceForm';
import styles from "../styles/Write.module.css";


const Write = () => {
  const fileInput = React.useRef(null);
  
  const [showAddButton, setShowAddButton] = useState(true);
  const [experienceForms, setExperienceForms] = useState([
    '활동을 하게 된 동기를 기록해주세요.',
    '맡은 역할과 수행 내용을 기록해주세요.',
    '힘들었던 점이 있었나요? 어떻게 극복하였나요?',
    '느낀점 및 배운점을 기록해주세요.',
  ]);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };
  const handleButtonClick = e => {
    fileInput.current.click();
  };
  


  // ExperienceForm 삭제
  const handleRemoveExperienceForm = (index) => {
    const newExperienceForms = [...experienceForms];
    newExperienceForms.splice(index, 1);
    setExperienceForms(newExperienceForms);
  };

  const handleAddExperienceForm = () => {
    setExperienceForms(prevForms => [...prevForms, '']);
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
            <PostForm />
            {experienceForms.map((experience, index) => (
            <ExperienceForm
              key={index}
              title={experience}
              onRemove={() => handleRemoveExperienceForm(index)}
            />
          ))}
            {showAddButton && (
              <div className={styles.add}>
                내용 추가하기
                <button className={styles.addButton} onClick={handleAddExperienceForm}>
                  +
                </button>
              </div>
            )}

            <div className={styles.add}> 파일 첨부하기
              <button className={styles.addButton} onClick={handleButtonClick}>
                +</button>
                <input
                id="file-upload"
                type="file"
                ref={fileInput}
                multiple={true}
                onChange={handleFileChange}
                className={styles.addButton}
                style={{ display: "none" }}
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
            
            <button className={styles.writeButton}>글쓰기</button>
          </div>
        </div>
      </div>
    )
}

export default Write;