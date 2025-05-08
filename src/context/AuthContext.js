import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext({
    isAuth: false,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(() => {
        const saved = localStorage.getItem('isAuth');
        return saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('isAuth', isAuth);
    }, [isAuth]);

    const login = () => setIsAuth(true);
    const logout = () => setIsAuth(false);

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};