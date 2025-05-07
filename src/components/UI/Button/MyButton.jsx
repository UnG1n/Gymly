import React from 'react';
import styles from './MyButton.module.css';

const MyButton = ({ children, onClick, type = 'button' }) => {
    return (
        <button className={styles['button']} type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default MyButton;