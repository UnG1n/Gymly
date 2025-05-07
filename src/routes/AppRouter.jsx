import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import ExerciseList from '../pages/ExerciseList';
import ExerciseDetail from '../pages/ExerciseDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AppRouter;
