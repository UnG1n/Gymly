import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import MyInput from "../../components/UI/Input/MyInput";
import MyButton from "../../components/UI/Button/MyButton";
import styles from "./Login.module.css";
import api from "../../api";
import logo from "../../assets/other/logo.png"; // путь к вашему логотипу

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const { data } = await api.post("/login", { email, password });

            if (!data.token || !data.user) {
                throw new Error("Неверный ответ сервера");
            }

            localStorage.setItem("token", data.token);
            login(data.user);
            navigate("/");
        } catch (err) {
            const errorMessage =
                err.response?.data?.error || err.message || "Ошибка при входе";
            setError(errorMessage);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.pageBackground} />
            <div className={styles.loginCard}>
                <div className={styles.headerWithLogo}>
                    <img src={logo} alt="Логотип" className={styles.logo} />
                    <h2 className={styles.loginTitle}>Вход</h2>
                </div>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <MyInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите email"
                        required
                    />
                    <MyInput
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                        required
                    />
                    {error && (
                        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
                    )}
                    <MyButton type="submit" className={styles.loginButton}>
                        Войти
                    </MyButton>
                </form>
            </div>
        </div>
    );
};

export default Login;
