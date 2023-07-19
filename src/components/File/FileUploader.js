import React from 'react';
import styles from '../../styles/Detail.module.css';

const FileUploader = ({ onFileChange }) => {
  const fileInput = React.useRef(null);

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    onFileChange(selectedFiles);
  };

  return (
    <div className={styles.add}>
        파일 추가하기
      <button 
      type="button"
      className={styles.addButton}
      onClick={handleButtonClick}> +
      </button>
      <input
        type="file"
        ref={fileInput}
        multiple={true}
        className={styles.addButton}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileUploader;
