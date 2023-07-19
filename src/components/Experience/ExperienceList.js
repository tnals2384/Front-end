import React, { useState } from 'react';
import ExperienceContainer from './ExperienceContainer';
import ExCreateForm from './ExCreateForm';
import styles from '../../styles/Detail.module.css';

const ExperienceList = ({ experiences, onAddExperience, onUpdateExperience, onDeleteExperience }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {experiences.map(experience => (
        <ExperienceContainer
          key={experience.experienceId}
          experience={experience}
          onUpdate={onUpdateExperience}
          onDelete={onDeleteExperience}
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
          onAddExperience={onAddExperience}
        />
      )}
    </>
  );
};

export default ExperienceList;
