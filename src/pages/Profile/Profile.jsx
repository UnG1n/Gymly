import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import { UserContext } from "../../context/UserContext";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import styles from "./Profile.module.css";
import defaultAvatar from "./avatar.jpg";

function parseSetsReps(reps) {
    if (typeof reps === "number") return { sets: 1, reps };
    if (typeof reps === "string") {
        const normalized = reps.toLowerCase().replace(/[хx*по ]+/g, "x");
        const parts = normalized.split("x").map(Number);
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            return { sets: parts[0], reps: parts[1] };
        }
        const onlyNumber = reps.match(/\d+/);
        if (onlyNumber) return { sets: 1, reps: Number(onlyNumber[0]) };
    }
    return { sets: 1, reps: 0 };
}

export default function Profile() {
    const { user, loading, fetchUserProfile } = useContext(UserContext);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const exerciseResults = user?.exerciseResults || {};

    // Количество уникальных упражнений с результатами
    const totalExercisesDone = Object.keys(exerciseResults).length;

    // Количество всех подходов (результатов)
    const totalSetsDone = Object.values(exerciseResults).reduce(
        (sum, ex) => sum + (Array.isArray(ex.results) ? ex.results.length : 0),
        0
    );

    // Общий поднятый вес (учитывая подходы и повторения)
    const totalWeightLifted = Object.values(exerciseResults).reduce(
        (sum, ex) => sum + (Array.isArray(ex.results)
            ? ex.results.reduce((subSum, result) => {
                const weight = typeof result.weight === "number" ? result.weight : 0;
                const { sets, reps } = parseSetsReps(result.reps);
                return subSum + (weight * sets * reps);
            }, 0)
            : 0),
        0
    );

    // Опции для селекта - только упражнения с результатами
    const exerciseOptions = Object.entries(exerciseResults)
        .filter(([_, data]) => Array.isArray(data.results) && data.results.length > 0)
        .map(([id, data]) => ({
            value: id,
            label: data.name || `Упражнение ${id}`,
        }));

    // ID упражнений без веса
    const exercisesWithoutWeight = [7, 28, 31, 32];

    // Автовыбор первого упражнения при загрузке, если нет выбранного
    useEffect(() => {
        if (!selectedExercise && exerciseOptions.length > 0) {
            setSelectedExercise(exerciseOptions[0]);
        }
    }, [exerciseOptions, selectedExercise]);

    useEffect(() => {
        if (!selectedExercise) {
            setChartData([]);
            return;
        }
        async function loadData() {
            const data = exerciseResults[selectedExercise.value]?.results || [];
            const isWeightless = exercisesWithoutWeight.includes(Number(selectedExercise.value));

            const chartFormatted = data.map((item, idx) => {
                const { sets, reps } = parseSetsReps(item.reps);
                const weight = typeof item.weight === "number" ? item.weight : 0;
                return {
                    workout: item.workout || idx + 1,
                    totalResult: isWeightless ? sets * reps : weight * reps,
                };
            });
            setChartData(chartFormatted);
        }
        loadData();
    }, [selectedExercise, exerciseResults]);

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

    if (loading) return <div>Загрузка профиля...</div>;
    if (!user) return <div>Пользователь не найден</div>;

    const avatarUrl = user.avatar
        ? user.avatar.startsWith("http")
            ? user.avatar
            : `https://gymly.ru${user.avatar}`
        : defaultAvatar;

    return (
        <div className={styles["profile-page"]}>
            <div className={styles["profile-grid"]}>
                <div className={styles["profile-card"]}>
                    <img src={avatarUrl} alt="Аватар" className={styles["profile-avatar"]} />
                    <h2>{user.name && user.name.trim() !== "" ? user.name : "Имя не указано"}</h2>
                    <div className={styles["profile-email"]}>{user.email || "Email не указан"}</div>
                    <div className={styles["profile-stats"]}>
                        <div>Выполнено разных упражнений: {totalExercisesDone}</div>
                        <div>Выполнено подходов: {totalSetsDone}</div>
                        <div>Общий поднятый вес: {totalWeightLifted} кг</div>
                    </div>
                    <button
                        onClick={() => setIsEditOpen(true)}
                        className={styles.editProfileBtn}
                        type="button"
                    >
                        Редактировать профиль
                    </button>
                    <button
                        onClick={fetchUserProfile}
                        className={styles.editProfileBtn}
                        type="button"
                        style={{ marginTop: 10 }}
                    >
                        Обновить данные
                    </button>
                </div>

                <div className={styles["profile-charts"]}>
                    <h3>Выберите упражнение для просмотра статистики</h3>
                    <Select
                        options={exerciseOptions}
                        value={selectedExercise}
                        onChange={setSelectedExercise}
                        placeholder="Начните вводить название упражнения..."
                        isSearchable
                        noOptionsMessage={() => "Нет упражнений с результатами"}
                        isClearable
                    />

                    {selectedExercise && chartData.length > 0 && (
                        <>
                            <div style={{ width: '100%', height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="workout"
                                            label={{ value: "Тренировка №", position: "insideBottom", dy: 10 }}
                                        />
                                        <YAxis label={{ value: "Результат", angle: -90, position: "insideLeft" }} />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="totalResult"
                                            name="Сила"
                                            stroke="#4caf50"
                                            strokeWidth={3}
                                            dot={{ r: 4 }}
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
                        </>
                    )}

                    {selectedExercise && chartData.length === 0 && (
                        <p style={{ marginTop: 20 }}>Нет данных для выбранного упражнения</p>
                    )}
                </div>
            </div>

            {isEditOpen && <ProfileEdit isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />}
        </div>
    );
}
