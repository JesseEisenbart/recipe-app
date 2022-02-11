import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../config/firebase';
import { Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdAddCircle } from 'react-icons/md';
import { IconContext } from 'react-icons/lib';
import './Nav.scss';


const Nav = () => {
    const [sidebar, setSidebar] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const [userName, setUserName] = useState("");

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }

    const sidebarData = [
        {
            title: "Recipes",
            path: "/recipes",
            icon: <FaIcons.FaCarrot />,
            click: null,
        },
        {
            title: "Add Recipe",
            path: "/add",
            icon: <MdAddCircle />,
            click: null,
        },
        {
            title: "Account",
            path: "/account",
            icon: <MdOutlineAccountCircle />,
            click: null,
            
        },
        {
            title: "Sign Out",
            path: "#",
            icon: <BiLogOut />,
            click: logout,
        },
    ]

    useEffect(() => {
        if (loading) return;
        if (user) {
            setUserName(user.displayName);
        }
    }, [user, loading]);

    return (
        <>
            <IconContext.Provider value={{color: "#fff"}}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={toggleSidebar}/>
                    </Link>         
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items">
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars" onClick={toggleSidebar}>
                            <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        <li className="nav-text">
                            <span className="display-name">Welcome, <br/>{userName}</span>
                        </li>
                        {sidebarData.map((item, index) => {
                            return (
                                <li key={index} className="nav-text">
                                    <Link to={item.path} onClick={ item.click ? item.click : () => {}}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
            <Outlet />
        </>
    )
}

export default Nav
