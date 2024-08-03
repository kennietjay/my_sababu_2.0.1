import { useState, useEffect, useRef } from "react";

import Logo from "./Logo";
import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

function AppNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.navContainer}>
      <nav
        className={`${"navbar sticky-top navbar-expand-lg navbar-dark"} ${
          styles.nav
        }`}
      >
        <NavLink className="navbar-brand" to="/" onClick={closeMenu}>
          <Logo />
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          ref={menuRef}
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav ms-auto">
            <List closeMenu={closeMenu} />
          </ul>
        </div>
      </nav>
    </div>
  );
}

function List({ closeMenu }) {
  return (
    <>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/home"
          evenkey="/"
          onClick={closeMenu}
        >
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/about"
          evenkey="/about"
          onClick={closeMenu}
        >
          About
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/services" onClick={closeMenu}>
          Services
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/membership" onClick={closeMenu}>
          Membership
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contacts" onClick={closeMenu}>
          Contact
        </NavLink>
      </li>
      {/* <li className="nav-item">
        <NavLink className="nav-link" to="/my_sababu" onClick={closeMenu}>
          My Sababu
        </NavLink>
      </li> */}
    </>
  );
}

export default AppNav;
