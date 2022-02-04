import { useState } from "react";
import { MdLockOutline } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import "./Login.scss";

const Login = ({type}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                        <div className="input-container">
                            <CgProfile/>
                            <input 
                                id="email"
                                type="text" 
                                name="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Type your email"
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label> 
                        <div className="input-container">
                            <MdLockOutline/>
                            <input 
                                id="password"
                                type="text" 
                                name="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Type your password"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
