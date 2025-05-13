import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { exercises } from '../exercisesData';
import styles from './ExerciseDetail.module.css';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function parseReps(repsStr) {
    const normalized = repsStr.toLowerCase().replace('х', 'x').replace('по', 'x');
    const match = normalized.match(/^(\d+)x(\d+)$/);
    if (match) {
        return { sets: parseInt(match[1], 10), reps: parseInt(match[2], 10) };
    }
    const reps = parseInt(repsStr, 10);
    return { sets: 1, reps: isNaN(reps) ? 0 : reps };
}

function aggregateResultsForChart(results, isBodyweightExercise) {
    const map = new Map();

    results.forEach(row => {
        const { sets, reps } = parseReps(row.reps);
        const totalReps = sets * reps;
        const singleSetResult = isBodyweightExercise ? totalReps : row.weight * reps;

        const workoutNum = row.workout;

        if (!map.has(workoutNum)) {
            map.set(workoutNum, { workout: workoutNum, totalResult: singleSetResult });
        } else {
            const existing = map.get(workoutNum);
            existing.totalResult += singleSetResult;
        }
    });

    const aggregated = Array.from(map.values()).sort((a, b) => a.workout - b.workout);

    return aggregated.slice(-8);
}

export default function ExerciseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const exercise = exercises.find((ex) => String(ex.id) === id);

    const bodyweightExercises = [
        'Подтягивания',
        'Подтягивания с резиной',
        'Скручивания на полу',
        'Подъем ног с упором на локтях',
        'Планка',
    ];

    const isBodyweightExercise = exercise && bodyweightExercises.includes(exercise.title);

    const [results, setResults] = useState([]);

    const [form, setForm] = useState({
        weight: '',
        reps: '',
        difficulty: 'Средне',
    });

    const [newRecord, setNewRecord] = useState(false);

    useEffect(() => {
        if (results.length < 1) {
            setNewRecord(false);
            return;
        }
        const chartData = aggregateResultsForChart(results, isBodyweightExercise);
        if (chartData.length === 0) {
            setNewRecord(false);
            return;
        }
        const maxResult = Math.max(...chartData.map(d => d.totalResult));
        const lastWorkoutNum = Math.max(...chartData.map(d => d.workout));
        const lastResultObj = chartData.find(d => d.workout === lastWorkoutNum);
        const lastResult = lastResultObj ? lastResultObj.totalResult : 0;

        // Новый рекорд, если последний результат >= максимального и > 0
        setNewRecord(lastResult >= maxResult && lastResult > 0);
    }, [results, isBodyweightExercise]);

    if (!exercise) return <div>Упражнение не найдено</div>;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.reps) return;

        const lastWorkout = results.length ? Math.max(...results.map(r => r.workout)) : 0;
        const newWorkoutNum = lastWorkout + 1;

        const newEntry = {
            workout: newWorkoutNum,
            weight: isBodyweightExercise ? 0 : Number(form.weight),
            reps: form.reps,
            difficulty: form.difficulty,
        };

        setResults([...results, newEntry]);
        setForm({ weight: '', reps: '', difficulty: 'Средне' });
    };

    const handleDelete = (index) => {
        setResults((prev) => prev.filter((_, i) => i !== index));
    };

    const chartData = aggregateResultsForChart(results, isBodyweightExercise);
    const maxResult = Math.max(...chartData.map(d => d.totalResult));

    return (
        <div className={styles.exerciseDetailPage}>
            <button
                className={styles.backButton}
                onClick={() => navigate(`/exercises/${exercise.muscle}`)}
            >
                ← Назад к упражнениям
            </button>

            <div className={styles.exerciseInfo}>
                <div className={styles.exerciseTableBlock}>
                    <div className={styles.exerciseTitle}>{exercise.title}</div>

                    <table className={styles.exerciseTable}>
                        <thead>
                        <tr>
                            <th>Номер тренировки</th>
                            {!isBodyweightExercise && <th>Вес кг</th>}
                            <th>Повторения</th>
                            <th>Сложность</th>
                            <th>Результат</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map((row, idx) => {
                            const { sets, reps } = parseReps(row.reps);
                            const totalReps = sets * reps;
                            const resultVal = isBodyweightExercise ? totalReps : row.weight * reps;

                            return (
                                <tr key={idx}>
                                    <td>{row.workout}</td>
                                    {!isBodyweightExercise && <td>{row.weight}</td>}
                                    <td>{row.reps}</td>
                                    <td>{row.difficulty}</td>
                                    <td>{resultVal.toFixed(1)}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className={styles.deleteButton}
                                            onClick={() => handleDelete(idx)}
                                            aria-label={`Удалить результат №${idx + 1}`}
                                        >
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    <form onSubmit={handleSubmit} className={styles.resultForm}>
                        <div className={styles.topRow}>
                            {!isBodyweightExercise && (
                                <input
                                    type="number"
                                    name="weight"
                                    value={form.weight}
                                    onChange={handleChange}
                                    placeholder="Вес, кг"
                                    required
                                    min={0}
                                    step="0.1"
                                    className={styles.smallInput}
                                />
                            )}
                            <input
                                type="text"
                                name="reps"
                                value={form.reps}
                                onChange={handleChange}
                                placeholder="Повторения (3x12, 3х12, 3по12)"
                                required
                                pattern="^\d+([xхXХ*]|по)\d+$"
                                title="Введите в формате 3x12, 3х12 или 3по12"
                                className={styles.fullWidthInput}
                            />
                            <select
                                name="difficulty"
                                value={form.difficulty}
                                onChange={handleChange}
                                className={styles.smallSelect}
                            >
                                <option value="Легко">Легко</option>
                                <option value="Средне">Средне</option>
                                <option value="Тяжело">Тяжело</option>
                            </select>
                        </div>

                        <button type="submit" className={styles.submitButton}>Добавить</button>
                    </form>
                </div>

                <div className={styles.exerciseChartBlock}>
                    {newRecord && (
                        <div style={{
                            marginBottom: 12,
                            padding: '10px 16px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            borderRadius: 8,
                            fontWeight: '700',
                            textAlign: 'center',
                            boxShadow: '0 4px 12px rgba(76,175,80,0.4)',
                            animation: 'fadeInScale 0.6s ease forwards',
                        }}>
                            🎉 Поздравляем! Новый рекорд!
                        </div>
                    )}
                    <div className={styles.exerciseChart}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="workout"
                                    label={{
                                        value: 'Тренировка №',
                                        position: 'insideBottom',
                                        dy: 20,
                                        style: { fill: '#3f51b5', fontWeight: 600 },
                                    }}
                                    tick={{ fill: '#3f51b5', fontWeight: '600' }}
                                />
                                <YAxis
                                    label={{ value: isBodyweightExercise ? 'Повторения' : 'Результат', angle: -90, position: 'insideLeft', fill: '#3f51b5', fontWeight: '600' }}
                                    tick={{ fill: '#3f51b5' }}
                                />
                                <Tooltip
                                    formatter={(value) => value.toFixed(1)}
                                    contentStyle={{ backgroundColor: '#f0f4ff', borderRadius: 8, border: 'none' }}
                                    labelStyle={{ fontWeight: '700', color: '#3f51b5' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="totalResult"
                                    stroke="#4caf50"
                                    strokeWidth={3}
                                    dot={(props) => {
                                        const { cx, cy, payload } = props;
                                        return payload.totalResult === maxResult ? (
                                            <circle cx={cx} cy={cy} r={8} fill="#4caf50" stroke="#388e3c" strokeWidth={2} />
                                        ) : (
                                            <circle cx={cx} cy={cy} r={4} fill="#3f51b5" />
                                        );
                                    }}
                                    isAnimationActive={true}
                                    animationDuration={800}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className={styles.exerciseTechniqueBlock}>
                <div className={styles.exerciseImageBlock}>
                    <img
                        src={exercise.image}
                        alt={exercise.title}
                        className={styles.exerciseImage}
                    />
                </div>
                <div className={styles.techniqueBlock}>
                    <h3>Техника выполнения:</h3>
                    {exercise.technique && Array.isArray(exercise.technique) ? (
                        <ol>
                            {exercise.technique.map((step, idx) => (
                                <li key={idx}>{step}</li>
                            ))}
                        </ol>
                    ) : (
                        <p>Информация о технике выполнения отсутствует.</p>
                    )}
                    {exercise.tip && (
                        <p><b>Совет:</b> {exercise.tip}</p>
                    )}
                </div>
            </div>

            <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </div>
    );
}
