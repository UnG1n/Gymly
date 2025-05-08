import {useNavigate, useParams} from 'react-router-dom';
import { exercises } from '../exercisesData';
import { muscleGroups } from '../muscleGroups';

export default function ExerciseList() {
    const { muscle } = useParams();
    const navigate = useNavigate();
    const group = muscleGroups.find(g => g.id === muscle);
    const groupExercises = exercises.filter(ex => ex.muscle === muscle);

    if (!group) return <div>Группа мышц не найдена</div>;

    return (
        <div className="exercise-list-page">
            <h2>{group.title}</h2>
            <p>{group.description}</p>
            <div className="exercise-cards-grid">
                {groupExercises.map(ex => (
                    <div
                        className="exercise-card"
                        key={ex.id}
                        onClick={() => navigate(`/exercise/${ex.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={ex.image} alt={ex.title} className="exercise-card-img"/>
                        <div className="exercise-reps">
                            {ex.reps.map(rep => <span key={rep}>{rep}</span>)}
                        </div>
                        <h4>{ex.title}</h4>
                        <p>{ex.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
