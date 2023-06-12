import React, {useState} from 'react'
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import ExperienceForm from '../components/ExperienceForm';
import styles from "../styles/Write.module.css";


const Write = () => {
  const [experienceForms, setExperienceForms] = useState([]);
  const [showAddButton, setShowAddButton] = useState(true);


  const handleAddExperienceForm = () => {
    setExperienceForms(prevForms => [...prevForms, <ExperienceForm />]);
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
            <ExperienceForm />
            <ExperienceForm />
            <ExperienceForm />
            <ExperienceForm />
            {showAddButton && <div className={styles.add}> 내용 추가하기
              <button className={styles.addButton}>+</button>
            </div>}
            <div className={styles.add}> 파일 첨부하기
              <button className={styles.addButton}>+</button>
            </div>

            <button className={styles.writeButton}>글쓰기</button>
          </div>
        </div>
      </div>
    )
}

export default Write;