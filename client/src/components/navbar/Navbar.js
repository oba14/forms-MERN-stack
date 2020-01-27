import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  return (
    <div >
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <div >
          <NavLink exact activeClassName="active"
            to="/"
            className="">
              Home
          </NavLink>           
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
