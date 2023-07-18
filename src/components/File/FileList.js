import React from 'react';
import styles from '../../styles/Detail.module.css';

const FileList = ({ files, onDeleteFile}) => {

  return (
    <div className={styles.exContainer}>
    <div className={styles.fileList}>
      {files.map((file, index) => {
        if (file.filePath.endsWith('.png') || file.filePath.endsWith('.jpg') || 
        file.filePath.endsWith('.jpeg') || file.filePath.endsWith('.gif')
         ) {
          return (
            <div key={index} className={styles.fileContainer}>
              <div className={styles.buttonContainer}>
                <button className={styles.deleteButton} onClick={() => onDeleteFile(file.fileId)}>
                  <span>삭제</span>
                </button>
              </div>
              <img src={file.filePath} alt={file.fileName} className={styles.image} />
              <div className={styles.fileName}>{file.fileName}</div>
            </div>
          );
        } else {
          return (
            <div key={index} className={styles.fileContainer}>
              <div className={styles.buttonContainer}>
                <button className={styles.deleteButton} onClick={() => onDeleteFile(file.fileId)}>
                  <span>삭제</span>
                </button>
              </div>
              <a href={file.filePath} target="_blank" rel="noopener noreferrer" className={styles.fileName}>
                {file.fileName}
              </a>
            </div>
          );
        }
      })}
    </div>
    </div>
  );
};

export default FileList;
