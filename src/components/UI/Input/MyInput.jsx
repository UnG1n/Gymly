import React from 'react';
import styles from './MyInput.module.css';

const MyInput = ({ label, type = 'text', name, value, onChange, placeholder }) => {
    return (
        <div className={styles.inputGroup}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                className={styles.input}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default MyInput;
