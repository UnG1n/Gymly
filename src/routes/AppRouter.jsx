import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import ExerciseList from '../pages/ExerciseList/ExerciseList';
import ExerciseDetail from '../pages/ExerciseDetail/ExerciseDetail';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ProfileEdit from '../pages/ProfileEdit/ProfileEdit';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function AppRouter() {
    const { isAuth } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/register" element={!isAuth ? <Register /> : <Navigate to="/" replace />} />
            <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" replace />} />
            <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login" replace />} />
            <Route path="/profile/edit" element={isAuth ? <ProfileEdit /> : <Navigate to="/login" replace />} />
            <Route path="/exercises/:muscle" element={isAuth ? <ExerciseList /> : <Navigate to="/login" replace />} />
            <Route path="/exercise/:id" element={isAuth ? <ExerciseDetail /> : <Navigate to="/login" replace />} />
            {/* Можно добавить 404 страницу */}
            <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} replace />} />
        </Routes>
    );
}

export default AppRouter;
