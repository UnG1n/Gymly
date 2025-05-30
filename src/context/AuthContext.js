import React, { createContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext({
    isAuth: false,
    user: null,
    login: () => {},
    logout: () => {},
    updateUser: () => {},
});

export const AuthProvider = ({ children }) => {
    // Инициализация состояния isAuth из localStorage
    const [isAuth, setIsAuth] = useState(() => {
        const storedIsAuth = localStorage.getItem("isAuth");
        return storedIsAuth === "true";
    });

    // Инициализация состояния user из localStorage с защитой от undefined
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Ошибка парсинга user из localStorage:", error);
            localStorage.removeItem("user");
            return null;
        }
    });

    // Синхронизация isAuth с localStorage
    useEffect(() => {
        localStorage.setItem("isAuth", isAuth ? "true" : "false");
    }, [isAuth]);

    // Синхронизация user с localStorage
    useEffect(() => {
        if (user) {
            try {
                localStorage.setItem("user", JSON.stringify(user));
            } catch (error) {
                console.error("Ошибка сериализации user в localStorage:", error);
            }
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // Функция логина
    const login = useCallback((userData) => {
        setIsAuth(true);
        setUser(userData);
        if (userData.token) {
            localStorage.setItem("token", userData.token);
        }
    }, []);

    // Функция логаута
    const logout = useCallback(() => {
        setIsAuth(false);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.setItem("isAuth", "false");
    }, []);

    // Обновление данных пользователя (например, после редактирования профиля)
    const updateUser = useCallback((updatedUser) => {
        setUser(updatedUser);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
