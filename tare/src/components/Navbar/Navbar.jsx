import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({props}) {
  return (
    <div>
        <nav className="navbar">
          <img src="" alt="foto de perfil" />
          <div className="links">
              <Link to="/">Home</Link>
              <Link to="/Grupos">Grupos</Link>
          </div>
      </nav>
    </div>

  );
}