import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { exercises } from '../exercisesData';
import styles from './ExerciseDetail.module.css';

export default function ExerciseDetail() {
    const { id } = useParams();
    const exercise = exercises.find(ex => String(ex.id) === id);

    const [results, setResults] = useState([
        { workout: 6, weight: 70, reps: '3x15', difficulty: 'Средне' },
        { workout: 7, weight: 80, reps: '4x10', difficulty: 'Тяжело' },
        { workout: 8, weight: 80, reps: '2x12', difficulty: 'Средне' },
    ]);
    const [form, setForm] = useState({
        workout: '',
        weight: '',
        reps: '',
        difficulty: 'Средне',
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setResults([...results, { ...form, workout: Number(form.workout) }]);
        setForm({ workout: '', weight: '', reps: '', difficulty: 'Средне' });
    };

    if (!exercise) return <div>Упражнение не найдено</div>;

    return (
        <div className={styles.exerciseDetailPage}>
            <div className={styles.exerciseInfo}>
                <div className={styles.exerciseTableBlock}>
                    <div className={styles.exerciseTitle}>{exercise.title}</div>
                    <table className={styles.exerciseTable}>
                        <thead>
                        <tr>
                            <th>Номер тренировки</th>
                            <th>Вес кг</th>
                            <th>Количество повторений</th>
                            <th>Сложность</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.workout}</td>
                                <td>{row.weight}</td>
                                <td>{row.reps}</td>
                                <td>{row.difficulty}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {/* Форма для добавления результата */}
                    <form onSubmit={handleSubmit} className={styles.resultForm}>
                        <input
                            type="number"
                            name="workout"
                            value={form.workout}
                            onChange={handleChange}
                            placeholder="№ тренировки"
                            required
                        />
                        <input
                            type="number"
                            name="weight"
                            value={form.weight}
                            onChange={handleChange}
                            placeholder="Вес, кг"
                            required
                        />
                        <input
                            type="text"
                            name="reps"
                            value={form.reps}
                            onChange={handleChange}
                            placeholder="Повторения"
                            required
                        />
                        <select
                            name="difficulty"
                            value={form.difficulty}
                            onChange={handleChange}
                        >
                            <option value="Легко">Легко</option>
                            <option value="Средне">Средне</option>
                            <option value="Тяжело">Тяжело</option>
                        </select>
                        <button type="submit">Добавить</button>
                    </form>
                </div>
                <div className={styles.exerciseChartBlock}>
                    <div className={styles.exerciseChart}>
                        [График прогресса]
                    </div>
                </div>
            </div>
            <div className={styles.exerciseTechnique}>
                <div className={styles.exerciseImageBlock}>
                    <img
                        src={exercise.image}
                        alt={exercise.title}
                        className={styles.exerciseImage}
                    />
                </div>
                <div className={styles.techniqueBlock}>
                    <h3>Техника выполнения:</h3>
                    <ol>
                        <li>Лягте на горизонтальную скамью, стопы плотно прижаты к полу.</li>
                        <li>Возьмите штангу хватом чуть шире плеч.</li>
                        <li>Опустите штангу к середине груди, контролируя движение.</li>
                        <li>Выжмите штангу вверх до полного разгибания рук.</li>
                    </ol>
                    <p><b>Совет:</b> Держите спину слегка прогнутой и избегайте рывков.</p>
                </div>
            </div>
        </div>
    );
}
