import MyFooter from "./components/UI/Footer/MyFooter";
import { useContext } from "react";
import { UserProvider } from "./context/UserContext";
import NavBar from "./components/UI/NavBar/NavBar";
import AppRouter from "./routes/AppRouter";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useShowNavFooter } from "./hooks/useShowNavFooter";

function AppContent() {
    const { isAuth, user: authUser } = useContext(AuthContext);
    const showNavFooter = useShowNavFooter();

    return (
        <UserProvider authUser={authUser}>
            <div className="page-wrapper">
                {isAuth && showNavFooter && <NavBar />}
                <main className="content">
                    <AppRouter />
                </main>
                {isAuth && showNavFooter && <MyFooter />}
            </div>
        </UserProvider>
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
