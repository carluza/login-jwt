import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        AuthApp
      </Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/signup">
          Registrarse
        </Link>
        <Link className="nav-link" to="/login">
          Iniciar sesión
        </Link>
        <Link className="nav-link" to="/private">
          Privado
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
