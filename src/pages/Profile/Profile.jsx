import React from 'react';
import styles from './Profile.module.css';
import avatar from './avatar.jpg';

export default function Profile() {
    return (
        <div className={styles['profile-page']}>
            <div className={styles['profile-grid']}>
                <div className={styles['profile-card']}>
                    <img
                        src={avatar}
                        alt="Аватар"
                        className={styles['profile-avatar']}
                    />
                    <h2>Владимир Барышников</h2>
                    <div className={styles['profile-email']}>
                        VladimirBaryshnikov@example.com
                    </div>
                    <div className={styles['profile-stats']}>
                        <div>Пройдено тренировок: 125</div>
                        <div>Выполнено упражнений: 875</div>
                        <div>Средний прогресс: +37%</div>
                    </div>
                </div>
                <div className={styles['profile-charts']}>
                    <div className={styles['profile-chart']}>[График 1]</div>
                    <div className={styles['profile-chart']}>[График 2]</div>
                </div>
            </div>
        </div>
    );
}
