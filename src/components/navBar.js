import { React } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
    const Navigate = useNavigate()
return(
    <header>
        IN THE BOOKS SHOP
    <div>
    <NavLink to="/" end>Home</NavLink>
    <NavLink to="/books">Shop</NavLink>
    </div>
    </header>
)


}

export default NavBar;
