import { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Account.scss";

const Account = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const [userID, setUserID] = useState("");

    useEffect(() => {
        if (loading) return;
        if (user) {
            setUserName(user.displayName);
            setUserEmail(user.email);
            setUserPhoto(user.photoURL);  
            setUserID(user.uid); 
        }
    }, [user, loading]);

    return (
        <div className="account-container">
            <div className="user-card">
                <img className="user-image "src={userPhoto} alt="Profile picture" title="Profile pciture"/>
                <div className="user-info">
                    <span className="user-email">Email: {userEmail}</span>
                    <span className="user-name">Name: {userName}</span>
                    <span className="user-id">ID: {userID}</span>
                </div>
            </div>
        </div>
    )
}

export default Account