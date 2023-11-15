import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {auth ? (
        <ul className="flex py-3 gap-10 justify-end text-lg px-6 bg-blue-900 text-white">
          <li>
            <Link to="/" className=" hover:text-blue-950 transition-all duration-200  group">
              home
            </Link>
          </li>
          <li>
            <Link to="/dev" className=" hover:text-blue-950 transition-all duration-200 relative group">
              dev
            </Link>

          </li>
          <li>
            <Link to="/project" className=" hover:text-blue-950 transition-all duration-200 relative group">
              project
            </Link>


          </li>
          <li>
            <Link to="/contact" className=" hover:text-blue-950 transition-all duration-200 relative group">
              contact
            </Link>

          </li>
          <li>
            <Link to="/blog-post" className=" hover:text-blue-950 transition-all duration-200 relative group">
              blog
            </Link>

          </li>
      
          <li>
            <Link to="/admin/login" onClick={logout} className=" hover:text-blue-950 transition-all duration-200 relative group">
              logout
            </Link>

          </li>
          <li>
            <Link to="/calender" onClick={logout} className=" hover:text-blue-950 transition-all duration-200 relative group">
             Calender
            </Link>

          </li>
          <li>
            <Link to="/ui" onClick={logout} className=" hover:text-blue-950 transition-all duration-200 relative group">
              ui
            </Link>

          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
export default Navbar;
