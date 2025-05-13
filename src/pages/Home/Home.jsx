import { useNavigate } from 'react-router-dom';
import { muscleGroups } from '../muscleGroups';
import styles from './Home.module.css'; // предположим, что стили в CSS-модуле

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className={styles.homepageContainer}>
            <div className={styles.gridMuscleGroups}>
                {muscleGroups.map(group => (
                    <div
                        key={group.id}
                        className={styles.muscleCard}
                        onClick={() => navigate(`/exercises/${group.id}`)}
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                navigate(`/exercises/${group.id}`);
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Перейти к упражнениям для группы мышц ${group.title}`}
                    >
                        <img
                            src={group.image}
                            alt={group.title}
                            className={styles.muscleCardImage}
                            loading="lazy"
                        />
                        <h4 className={styles.muscleCardTitle}>{group.title}</h4>
                        <p className={styles.muscleCardDescription}>{group.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
