import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar =(props)=>{

    const {profile,result}=props;

    return (
        <div className="container ">
           <nav className="navbar navbar-expand-lg navbar-light p-3 navbar">
                <div className="container ">
                    <p className="navbar-brand h2 text-white heading">SRMS</p>
                    <button className="navbar-toggler m-1 text-white mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                        <NavLink className="nav-link text-white me-4 rounded" aria-current="page" to="/profile">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-white rounded me-4" to="/Result">Result</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link text-white rounded me-4"  to="/Logout">Log Out</NavLink>
                        </li>
                      
                    </ul>
                    </div>
                </div>
            </nav>
            </div>
    )

}

export default Navbar;