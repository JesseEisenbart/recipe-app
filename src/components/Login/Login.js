import { useState, useEffect } from "react";
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.scss";

const Login = ({type}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (user) navigate("/recipes");
      }, [user, loading]);

    const getForm = (type) => {
        // return ( type === "login" ? () : () )
    }


    return (
        <div className="login">
            <div className="login-container">
                <div className="login-card">
                    <h1 className="title">Login</h1>
                    <div className="input-group">
                        <label htmlFor="email">Email</label> 
                        <input 
                            id="email"
                            type="text" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="email@example.com"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label> 
                        <input 
                            id="password"
                            type="text" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="password"
                        />
                    </div>
                    <div>
                        <button 
                            className="login-btn btn" 
                            type="submit"
                            onClick={() => logInWithEmailAndPassword(email, password)}
                        >
                            Login
                        </button>
                    </div>
                    <div className="other-login-text">
                    <div className="line"/><span>or</span><div className="line"/>
                    </div>
                    <div className="google-login">
                        <button className="google-btn btn" type="submit" onClick={() => signInWithGoogle(email, password)}><FcGoogle/>Sign in with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
