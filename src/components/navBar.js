import React, { useState, useEffect } from "react";
import "./app.css";
import { GiBookCover } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";

function NavBar({loggedIn, setLoggedIn}) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
// console.log("Token", localStorage.getItem("token"))
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <NavLink to="/" end className="navbar-logo" onClick={closeMobileMenu}>
              <GiBookCover className="navbar-icon" />
              InTheBooks!
            </NavLink>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/" end
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
                  to ="/books"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? "activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Shop
                </NavLink>
              </li>

              {loggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/me"
                      className={({ isActive }) =>
                        "nav-links" + (isActive ? " activated" : "")
                      }
                      onClick={closeMobileMenu}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/logIn"
                      className={({ isActive }) =>
                        "nav-links" + (isActive ? " activated" : "")
                      }
                      onClick={() => {
                        closeMobileMenu();
                        localStorage.clear();
                        setLoggedIn(null);
                      }}
                    >
                      Log Out
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        "nav-links" + (isActive ? " activated" : "")
                      }
                      onClick={closeMobileMenu}
                    >
                      <span className="material-symbols-outlined">
                        shopping_cart
                      </span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item" id="lastChildItem">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;
