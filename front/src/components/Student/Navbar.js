import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar =()=>{

    return (
        <div className="container ">
           <nav className="navbar navbar-expand-lg navbar-light p-3">
                <div className="container">
                    <NavLink className="navbar-brand h2 text-white" to="/Profile">SRMS</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                        <NavLink className="nav-link text-white active me-4" aria-current="page" to="/profile">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-white me-4" to="/Result">Result</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-white me-4" to="/Logout">Log Out</NavLink>
                        </li>
                      
                    </ul>
                    </div>
                </div>
            </nav>
            </div>
    )

}

export default Navbar;