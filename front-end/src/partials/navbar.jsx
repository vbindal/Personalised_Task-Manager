import React from "react";
import useAuth from "../useAuth";

const Navbar = () => {
  const { auth } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
      <div className="container-fluid">
        <h2>
          TASK MANAGER
        </h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/home">
                Home
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Logout
              </a>
            </li>
            {auth &&
            <h2> 
                {auth.email}            
            </h2>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
