import './App.css';
import AppRouter from "./routes/AppRouter";
import NavBar from "./components/UI/NavBar/NavBar";
import MyFooter from "./components/UI/Footer/MyFooter";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import {useContext} from "react";
import {useShowNavFooter} from "./hooks/useShowNavFooter";

function AppContent() {
    const { isAuth } = useContext(AuthContext);
    const showNavFooter = useShowNavFooter();

    return (
        <div>
            {isAuth && showNavFooter && <NavBar />}
            <main>
                <AppRouter />
            </main>
            {isAuth && showNavFooter && <MyFooter />}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
