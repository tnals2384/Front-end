// Pagination.js
import React from 'react';
import styles from '../styles/Home.module.css';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  
    return (
            <div className={styles.pagination}>
                <button
                className={`${styles.pageButton} ${currentPage === 0? styles.disabled : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                >
                이전
                </button>
                <button
                className={`${styles.pageButton} ${currentPage === totalPages -1 ? styles.disabled : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                >
                다음
                </button>
            </div>
    );
};

export default Pagination;
