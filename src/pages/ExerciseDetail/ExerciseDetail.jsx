import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { exercises } from '../exercisesData';
import styles from './ExerciseDetail.module.css';
import { UserContext } from '../../context/UserContext';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function parseSetsReps(repsStr) {
    if (typeof repsStr === "number") return { sets: 1, reps: repsStr };
    const normalized = repsStr.toLowerCase().replace(/[хx*по ]+/g, "x");
    const parts = normalized.split("x").map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return { sets: parts[0], reps: parts[1] };
    }
    const onlyNumber = repsStr.match(/\d+/);
    if (onlyNumber) return { sets: 1, reps: Number(onlyNumber[0]) };
    return { sets: 1, reps: 0 };
}

function aggregateResultsForChart(results, isBodyweightExercise) {
    const map = new Map();
    results.forEach(row => {
        const { sets, reps } = parseSetsReps(row.reps);
        const totalReps = sets * reps;
        const singleSetResult = isBodyweightExercise ? totalReps : row.weight * sets * reps;
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

function getChartHeight() {
    if (window.innerWidth <= 400) return 220;
    if (window.innerWidth <= 600) return 270;
    if (window.innerWidth <= 900) return 320;
    return 340;
}

export default function ExerciseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const exercise = exercises.find((ex) => String(ex.id) === id);
    const { user, saveExerciseResult, fetchExerciseResults, removeExerciseResult } = useContext(UserContext);

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
    const [chartHeight, setChartHeight] = useState(getChartHeight());

    useEffect(() => {
        async function loadResults() {
            const loadedResults = await fetchExerciseResults(id);
            setResults(loadedResults || []);
        }
        loadResults();
    }, [id, fetchExerciseResults]);

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
        setNewRecord(lastResult >= maxResult && lastResult > 0);
    }, [results, isBodyweightExercise]);

    useEffect(() => {
        const onResize = () => setChartHeight(getChartHeight());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    if (!exercise) return <div>Упражнение не найдено</div>;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
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

        await saveExerciseResult(id, newEntry);

        const loadedResults = await fetchExerciseResults(id);
        setResults(loadedResults || []);
        setForm({ weight: '', reps: '', difficulty: 'Средне' });
    };

    const handleDelete = async (index) => {
        await removeExerciseResult(id, index);
        const loadedResults = await fetchExerciseResults(id);
        setResults(loadedResults || []);
    };

    const chartData = aggregateResultsForChart(results, isBodyweightExercise);

    // Рассчитываем прогресс: насколько максимальный результат больше первого (в процентах)
    const progress = (() => {
        if (chartData.length < 2) return { percent: 0, text: 'Недостаточно данных для расчёта прогресса' };
        const firstResult = chartData[0].totalResult;
        const maxResult = Math.max(...chartData.map(d => d.totalResult));
        if (firstResult <= 0) return { percent: 0, text: 'Недостаточно данных для расчёта прогресса' };
        const percent = Math.round(((maxResult - firstResult) / firstResult) * 100);
        const isPositive = percent >= 0;
        return {
            percent,
            text: `Прогресс: ${isPositive ? '+' : ''}${percent}% (максимальный результат ${maxResult}, первый ${firstResult})`
        };
    })();

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
                    <div className={styles.exerciseTableWrapper}>
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
                                const { sets, reps } = parseSetsReps(row.reps);
                                const totalReps = sets * reps;
                                const resultVal = isBodyweightExercise ? totalReps : row.weight * reps;
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
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
                    </div>
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
                        <ResponsiveContainer width="100%" height={chartHeight} minHeight={220}>
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
                                    label={{
                                        value: isBodyweightExercise ? 'Повторения' : 'Результат',
                                        angle: -90,
                                        position: 'insideLeft',
                                        fill: '#3f51b5',
                                        fontWeight: '600'
                                    }}
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
                                    name="Сила"
                                    stroke="#4caf50"
                                    strokeWidth={3}
                                    dot={(props) => {
                                        const { cx, cy, payload } = props;
                                        const maxResult = Math.max(...chartData.map(d => d.totalResult));
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
                    <div className={styles.progressContainer}>
                        <div className={styles.progressTitle}>Ваш прогресс</div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{
                                    width: `${Math.max(0, progress.percent)}%`,
                                    backgroundColor: progress.percent >= 0 ? 'var(--color-primary)' : 'var(--color-error)'
                                }}
                            />
                        </div>
                        <div className={styles.progressText}>{progress.text}</div>
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
                    0% { opacity: 0; transform: scale(0.8); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
