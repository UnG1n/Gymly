import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import MyInput from '../../components/UI/Input/MyInput';
import MyButton from '../../components/UI/Button/MyButton';
import styles from './Register.module.css';
import api from '../../api';
import background from '../../assets/other/gymBackground.jpg';

export default function Register() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const validate = () => {
        const errs = {};
        if (!form.email) errs.email = 'Email обязателен';
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Неверный формат email';

        if (!form.password) errs.password = 'Пароль обязателен';

        if (form.password !== form.confirmPassword) errs.confirmPassword = 'Пароли не совпадают';

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const payload = {
                email: form.email,
                password: form.password,
                name: form.email.split('@')[0] || 'User',
            };

            const { data } = await api.post('/register', payload);

            // Автоматический вход после регистрации
            const loginResponse = await api.post('/login', {
                email: form.email,
                password: form.password,
            });

            localStorage.setItem('token', loginResponse.data.token);
            login(loginResponse.data.user);

            navigate('/');
        } catch (err) {
            if (err.response?.data?.errors) {
                const serverErrors = {};
                err.response.data.errors.forEach(({ param, msg }) => {
                    serverErrors[param] = msg;
                });
                setErrors(serverErrors);
            } else {
                setError(err.response?.data?.error || 'Ошибка при регистрации');
            }
        }
    };

    return (
        <div className={styles.registerPage}>
            <div
                className={styles.pageBackground}
                style={{ backgroundImage: `url(${background})` }}
            />
            <div className={styles.registerCard}>
                <h2 className={styles.registerTitle}>Регистрация</h2>
                <form onSubmit={handleSubmit} className={styles.registerForm} noValidate>
                    <div className={styles.fieldLabel}>Email</div>
                    <MyInput
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Введите email"
                        error={errors.email}
                    />
                    <div className={styles.fieldLabel}>Пароль</div>
                    <MyInput
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Введите пароль не менее 6 символов"
                        error={errors.password}
                    />
                    <div className={styles.fieldLabel}>Повторите пароль</div>
                    <MyInput
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Повторите пароль"
                        error={errors.confirmPassword}
                    />
                    {error && <div className={styles.registerError}>{error}</div>}
                    <MyButton type="submit" className={styles.registerButton}>
                        Зарегистрироваться
                    </MyButton>
                </form>
                <div className={styles.loginPrompt}>
                    Уже зарегистрированы?{" "}
                    <Link to="/login" className={styles.loginLink}>
                        Авторизация
                    </Link>
                </div>
            </div>
        </div>
    );
}
