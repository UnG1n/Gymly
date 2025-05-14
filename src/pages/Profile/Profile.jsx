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

function parseReps(reps) {
    if (typeof reps === "number") return reps;
    if (typeof reps === "string") {
        const normalized = reps.toLowerCase().replace(/[хx*по ]+/g, "x");
        const parts = normalized.split("x").map(Number);
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            return parts[1];
        }
        const onlyNumber = reps.match(/\d+/);
        if (onlyNumber) return Number(onlyNumber[0]);
    }
    return 0;
}

export default function Profile() {
    const { user, loading, fetchUserProfile } = useContext(UserContext);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const exerciseResults = user?.exerciseResults || {};

    // Считаем общее количество выполненных подходов (результатов)
    const totalExercisesDone = Object.values(exerciseResults).reduce(
        (sum, ex) => sum + (Array.isArray(ex.results) ? ex.results.length : 0),
        0
    );

    // Опции для селекта - только упражнения с результатами
    const exerciseOptions = Object.entries(exerciseResults)
        .filter(([_, data]) => Array.isArray(data.results) && data.results.length > 0)
        .map(([id, data]) => ({
            value: id,
            label: data.name || `Упражнение ${id}`,
        }));

    // ID упражнений без веса (замените на ваши ID)
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
                const reps = typeof item.reps === "string" ? parseReps(item.reps) : item.reps || 0;
                const weight = typeof item.weight === "number" ? item.weight : 0;
                return {
                    workout: item.workout || idx + 1,
                    totalResult: isWeightless ? reps : weight * reps,
                };
            });
            setChartData(chartFormatted);
        }
        loadData();
    }, [selectedExercise, exerciseResults]);

    if (loading) return <div>Загрузка профиля...</div>;

    if (!user) return <div>Пользователь не найден</div>;

    const avatarUrl = user.avatar
        ? user.avatar.startsWith("http")
            ? user.avatar
            : `http://localhost:5000${user.avatar}`
        : defaultAvatar;

    return (
        <div className={styles["profile-page"]}>
            <div className={styles["profile-grid"]}>
                <div className={styles["profile-card"]}>
                    <img src={avatarUrl} alt="Аватар" className={styles["profile-avatar"]} />
                    <h2>{user.name && user.name.trim() !== "" ? user.name : "Имя не указано"}</h2>
                    <div className={styles["profile-email"]}>{user.email || "Email не указан"}</div>
                    <div className={styles["profile-stats"]}>
                        <div>Выполнено упражнений: {totalExercisesDone}</div>
                    </div>
                    <button
                        onClick={() => setIsEditOpen(true)}
                        className={styles.editProfileBtn}
                        type="button"
                    >
                        Редактировать профиль
                    </button>
                    {/* Новая кнопка обновления данных */}
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
                        <ResponsiveContainer width="100%" height={300}>
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
                                    stroke="#4caf50"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
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
