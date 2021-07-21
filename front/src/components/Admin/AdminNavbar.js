import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavbar= () =>{
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container mt-2">
                    <p className="navbar-brand h2 text-white heading" to="/">SRMS</p>
                    <button className="navbar-toggler text-white me-3 mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto" id="navbar">
                        <li className="nav-item">
                        <NavLink className="nav-link text-white mx-2" aria-current="page" to="/AProfile">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-white mx-2" to="AResult">Results</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-white mx-2" to="/Marks">Add Result</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-white mx-2" to="/SSignup">Add Student</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-white mx-2" to="/ALogout">Log out</NavLink>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            </>
    )

}

export default AdminNavbar;