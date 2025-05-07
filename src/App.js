import './App.css';
import AppRouter from "./routes/AppRouter";
import NavBar from "./components/UI/NavBar/NavBar";
import MyFooter from "./components/UI/Footer/MyFooter";

function AppContent() {

    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
            <NavBar />
            <main style={{ flex: 1 }}>
                <AppRouter />
            </main>
            <MyFooter />
        </div>
    );
}

function App() {
    return <AppContent />;
}

export default App;
