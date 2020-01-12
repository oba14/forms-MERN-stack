import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
      <div >
        <nav >
          <div >
            <NavLink exact activeClassName="active"
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className=" col s5 black-text">
              Home
            </NavLink>           
          </div>
        </nav>
      </div>
    );
}

export default Navbar;
