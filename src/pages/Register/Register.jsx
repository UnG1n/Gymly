import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import MyInput from '../../components/UI/Input/MyInput';
import MyButton from '../../components/UI/Button/MyButton';
import styles from './Register.module.css';
import api from '../../api'; // axios-инстанс с базовым URL

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
        console.log('Форма отправлена');
        if (!validate()) return;

        try {
            const payload = {
                email: form.email,
                password: form.password,
                name: form.email.split('@')[0] || 'User',
            };
            console.log('Отправляем на сервер:', payload);

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
            console.error('Ошибка при регистрации:', err.response?.data);

            if (err.response?.data?.errors) {
                // Логируем ошибки валидации с сервера
                console.log('Ошибки валидации с сервера:', err.response.data.errors);

                // Преобразуем массив ошибок в объект для отображения рядом с полями
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
            <div className={styles.registerCard}>
                <h2 className={styles.registerTitle}>Регистрация</h2>
                <form onSubmit={handleSubmit} className={styles.registerForm} noValidate>
                    <MyInput
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Введите email"
                        error={errors.email}
                    />
                    <MyInput
                        label="Пароль"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Введите пароль не менее 6 символов"
                        error={errors.password}
                    />
                    <MyInput
                        label="Подтвердите пароль"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Повторите пароль"
                        error={errors.confirmPassword}
                    />
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <MyButton type="submit" className={styles.registerButton}>
                        Зарегистрироваться
                    </MyButton>
                </form>
            </div>
        </div>
    );
}
