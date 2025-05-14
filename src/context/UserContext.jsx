import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import api from "../api";
import { exercises } from "../pages/exercisesData";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

function normalizeExerciseResults(exerciseResults) {
    if (!exerciseResults) return {};
    const normalized = {};
    for (const [id, data] of Object.entries(exerciseResults)) {
        const ex = exercises.find((ex) => String(ex.id) === String(id));
        normalized[id] = {
            name: ex ? ex.title : data.name || `Упражнение ${id}`,
            results: Array.isArray(data.results) ? data.results : data,
        };
    }
    return normalized;
}

export const UserProvider = ({ children, authUser }) => {
    const { updateUser: updateAuthUser } = useContext(AuthContext);

    const [user, setUser] = useState(() => {
        if (authUser) {
            return {
                ...authUser,
                exerciseResults: normalizeExerciseResults(authUser.exerciseResults || {}),
            };
        }
        const stored = localStorage.getItem("user");
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                ...parsed,
                exerciseResults: normalizeExerciseResults(parsed.exerciseResults || {}),
            };
        }
        return null;
    });

    const [loading, setLoading] = useState(false);

    const setUserAndSync = useCallback(
        (updatedUser, sync = true) => {
            setUser((prevUser) => {
                if (
                    prevUser &&
                    updatedUser &&
                    prevUser.id === updatedUser.id &&
                    JSON.stringify(prevUser.exerciseResults) === JSON.stringify(updatedUser.exerciseResults)
                ) {
                    return prevUser;
                }
                if (sync) {
                    updateAuthUser(updatedUser);
                }
                return updatedUser;
            });
        },
        [updateAuthUser]
    );

    const updateUser = useCallback(
        (updatedUser) => {
            setUserAndSync(updatedUser, true);
        },
        [setUserAndSync]
    );

    const fetchExerciseResults = useCallback(
        async (exerciseId) => {
            try {
                const { data } = await api.get(`/user/exercise/${exerciseId}/results`);
                return data;
            } catch (error) {
                console.error("Ошибка загрузки результатов упражнения:", error);
                return [];
            }
        },
        []
    );

    const fetchAllExerciseResults = useCallback(async () => {
        if (!user?.exerciseResults) return;
        const exerciseIds = Object.keys(user.exerciseResults);
        await Promise.all(exerciseIds.map((id) => fetchExerciseResults(id)));
    }, [user, fetchExerciseResults]);

    useEffect(() => {
        if (user) {
            fetchAllExerciseResults();
        }
    }, [user, fetchAllExerciseResults]);

    const fetchUserProfile = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/profile");
            const normalizedResults = normalizeExerciseResults(data.exerciseResults);
            const updatedUser = { ...data, exerciseResults: normalizedResults };
            setUserAndSync(updatedUser, false);
            setLoading(false);
        } catch (error) {
            console.error("Ошибка загрузки профиля:", error);
            setUserAndSync(undefined, false);
            localStorage.removeItem("user");
            setLoading(false);
        }
    }, [setUserAndSync]);

    useEffect(() => {
        if (authUser) {
            const normalizedResults = normalizeExerciseResults(authUser.exerciseResults);
            const updatedUser = { ...authUser, exerciseResults: normalizedResults };
            setUserAndSync(updatedUser, false);
            setLoading(false);
        } else {
            fetchUserProfile();
        }
    }, [authUser, fetchUserProfile, setUserAndSync]);

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                fetchUserProfile,
                saveExerciseResult: async (exerciseId, result) => {
                    try {
                        const { data } = await api.post(`/user/exercise/${exerciseId}/result`, result);
                        setUserAndSync((prev) => {
                            if (!prev) return prev;
                            const updated = { ...prev };
                            if (!updated.exerciseResults) updated.exerciseResults = {};
                            if (!updated.exerciseResults[exerciseId]) {
                                const ex = exercises.find((ex) => String(ex.id) === String(exerciseId));
                                updated.exerciseResults[exerciseId] = {
                                    name: ex ? ex.title : `Упражнение ${exerciseId}`,
                                    results: [],
                                };
                            }
                            updated.exerciseResults[exerciseId] = {
                                ...updated.exerciseResults[exerciseId],
                                results: [...updated.exerciseResults[exerciseId].results, data],
                            };
                            return updated;
                        }, true);
                        return data;
                    } catch (error) {
                        console.error("Ошибка сохранения результата упражнения:", error);
                        throw error;
                    }
                },
                fetchExerciseResults,
                removeExerciseResult: async (exerciseId, resultIndex) => {
                    try {
                        await api.delete(`/user/exercise/${exerciseId}/result/${resultIndex}`);
                        setUserAndSync((prev) => {
                            if (!prev) return prev;
                            const updated = { ...prev };
                            const currentResults = updated.exerciseResults?.[exerciseId]?.results || [];
                            updated.exerciseResults = { ...updated.exerciseResults };
                            updated.exerciseResults[exerciseId] = {
                                ...updated.exerciseResults[exerciseId],
                                results: currentResults.filter((_, idx) => idx !== resultIndex),
                            };
                            return updated;
                        }, true);
                    } catch (error) {
                        console.error("Ошибка удаления результата упражнения:", error);
                    }
                },
                updateUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
