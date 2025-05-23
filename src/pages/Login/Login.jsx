import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import MyInput from "../../components/UI/Input/MyInput";
import MyButton from "../../components/UI/Button/MyButton";
import styles from "./Login.module.css";
import api from "../../api";
import background from "../../assets/other/gymBackground.jpg";

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
            <div
                className={styles.pageBackground}
                style={{ backgroundImage: `url(${background})` }}
            />
            <div className={styles.loginCard}>
                <h2 className={styles.loginTitle}>Вход</h2>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.fieldLabel}>Email</div>
                    <MyInput
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите email"
                        required
                    />
                    <div className={styles.fieldLabel}>Пароль</div>
                    <MyInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                        required
                    />
                    {error && (
                        <div className={styles.loginError}>{error}</div>
                    )}
                    <MyButton type="submit" className={styles.loginButton}>
                        Войти
                    </MyButton>
                </form>
                <div className={styles.registerPrompt}>
                    Ещё не зарегистрированы?{" "}
                    <Link to="/register" className={styles.registerLink}>
                        Зарегистрироваться
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
