import { useNavigate } from 'react-router-dom';
import { muscleGroups } from '../muscleGroups';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="muscle-groups-grid">
            {muscleGroups.map(group => (
                <div
                    key={group.id}
                    className="muscle-card"
                    onClick={() => navigate(`/exercises/${group.id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <img src={group.image} alt={group.title} />
                    <h4>{group.title}</h4>
                    <p>{group.description}</p>
                </div>
            ))}
        </div>
    );
}
