import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { authActions } from "../features/auth/authSlice";
import "../index.css";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(authActions.reset());
    navigate("/login");
  };
  return (
    <header className="header-nav">
      <div className="logo">
        <Link to="/">
          <h2>Goals</h2>
        </Link>
      </div>
      <ul>
        {user ? (
          <button onClick={logoutHandler}>
            <FaSignOutAlt />
            Logout
          </button>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
