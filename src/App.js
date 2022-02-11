import { Outlet, useNavigate } from "react-router-dom";
import './styles/style.scss';
import Nav from './components/Nav/Nav';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { useEffect } from "react";

function App() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/");
    }, [user, loading]);

    return (
        <div className="App">
            <Outlet /> 
        </div>
    );
}

export default App;
