import React, { useState } from "react";
import "./app.css";
import { GiBookCover } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <GiBookCover className="navbar-icon" />
              InTheBooks!
            </NavLink>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  exact to="/"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/books"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Shop
                </NavLink>

                <li  className="nav-item" id="lastChildItem">
                <NavLink
                  exact to="/login"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
              </li>

                
              </li>
              {/* <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Contact
                </NavLink>
              </li> */}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

    // <header>
    //     IN THE BOOKS SHOP
    // <div>
    // <NavLink to="/" end>Home</NavLink>
    // <NavLink to="/books">Shop</NavLink>
    // </div>
    // </header>




export default NavBar;
