import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import MyInput from "../../components/UI/Input/MyInput";
import MyButton from "../../components/UI/Button/MyButton";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // фиктивная авторизация, для теста
        login();
        navigate('/');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <MyInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите email"
                />
                <MyInput
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                />
                <MyButton type="submit" style={{ marginTop: '15px' }}>
                    Войти
                </MyButton>
            </form>
        </div>
    );
};

export default Login;