import React from "react";
import { Link } from "react-router-dom";
import { DisconnectButton } from "../DisconnectButton/DisconnectButton";
import { useAtomValue } from "jotai";
import { tokenAtom } from "../../atoms/atoms";

export const Navbar = () => {
  const token = useAtomValue(tokenAtom);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profil
                </Link>
              </li>
              <li className="nav-item">
                <DisconnectButton />
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Connexion
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Inscription
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
);
};
