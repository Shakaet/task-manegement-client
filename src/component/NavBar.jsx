import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

export const NavBar = () => {
  

    let {user,signOuts}=useContext(AuthContext)
    let nav= useNavigate()


    let handleLogout=async()=>{
        await signOuts()
        nav("/login")


    }


  return (
    <div>
      <div className="navbar bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavItem to="/managetask" text="Manage Task" />
              <NavItem to="/addtask" text="Add Task" />
            </ul>
          </div>

          {/* Website Name */}
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            Task Management
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6">
            <NavItem to="/managetask" text="Manage Task" />
            <NavItem to="/addtask" text="Add Task" />
          </ul>
        </div>

        {/* Authentication Button */}
        <div className="navbar-end">
          {user ? (
            <Link onClick={handleLogout} className="btn bg-red-500 hover:bg-red-600">
              Logout
            </Link>
          ) : (
            <Link to="/login" className="btn bg-green-500 hover:bg-green-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable NavItem Component
const NavItem = ({ to, text }) => {
  return (
    <li>
      <Link
        to={to}
        className="font-medium text-lg hover:text-yellow-300 transition duration-300"
      >
        {text}
      </Link>
    </li>
  );
};
