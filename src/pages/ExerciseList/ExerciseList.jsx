import {useNavigate, useParams} from 'react-router-dom';
import { exercises } from '../exercisesData';
import { muscleGroups } from '../muscleGroups';
import styles from './ExerciseList.module.css';

export default function ExerciseList() {
    const { muscle } = useParams();
    const navigate = useNavigate();
    const group = muscleGroups.find(g => g.id === muscle);
    const groupExercises = exercises.filter(ex => ex.muscle === muscle);

    if (!group) return <div>Группа мышц не найдена</div>;

    return (
        <div className={styles.exerciseListPage}>
            <button
                className={styles.backButton}
                onClick={() => navigate('/')}
            >
                ← Назад к выбору группы мышц
            </button>

            <h2 className={styles.groupTitle}>{group.title}</h2>
            <p className={styles.groupDescription}>{group.description}</p>

            <div className={styles.exerciseCardsGrid}>
                {groupExercises.map(ex => (
                    <div
                        key={ex.id}
                        className={styles.exerciseCard}
                        onClick={() => navigate(`/exercise/${ex.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={ex.image}
                            alt={ex.title}
                            className={styles.exerciseCardImg}
                        />
                        <div className={styles.exerciseReps}>
                            {ex.repsRecommended.map(rep => (
                                <span key={rep} className={styles.repItem}>{rep}</span>
                            ))}
                        </div>
                        <h4 className={styles.exerciseTitle}>{ex.title}</h4>
                        <p className={styles.exerciseDescription}>{ex.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}