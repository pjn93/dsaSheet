import React from "react";
import { Outlet, Link, Links, useNavigate } from "react-router-dom";
import './style.scss'

function Navbar() {
  const navigate = useNavigate();


  const handleLogout = () => {
   localStorage.removeItem('email')
   navigate("/login");

  }

  return (
    <div className="wrapper">
      <div className="navbar-wrapper">
        <h1 className="left-side">Dashboard</h1>
        <ul>
          <li><Link to={'/profile'}>Profile</Link></li>
          <li><Link to={'/topics'}>Topics</Link></li>
          <li><Link to={'/progress'}>Progress</Link></li>
        <li onClick={()=>handleLogout()}>Logout</li>

        </ul>
        
      </div>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default Navbar;
