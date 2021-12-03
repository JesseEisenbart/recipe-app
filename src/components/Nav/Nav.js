import React from 'react'
import './Nav.scss';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <div className="logo-group">
                    <div className="logo">
                        <i className="fas fa-utensils"></i>
                    </div>
                    <div className="title">
                        <span>RecipMe</span>
                    </div>
                </div>
            </Link>

            <Link to="add"className="btn add">Add Recipe</Link>
        </nav>
    )
}

export default Nav
