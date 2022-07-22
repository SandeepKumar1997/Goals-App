import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../features/auth/authSlice";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
const Login = () => {
  const { user, isSending, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(authActions.reset());
  }, [user, isSuccess, isError, navigate, dispatch, message]);

  const changeHandler = (e) => {
    setData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };



  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  
  if (isSending) {
    <Spinner />;
  }
  return (
    <>
      <div className="login-header">
        <FaRegEdit />
        <h1>Login</h1>
        <h3>Please login with your credentials</h3>
      </div>
      <div className="form-section">
        <form onSubmit={submitHandler}>
          <input
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={changeHandler}
            placeholder="Enter Email"
          ></input>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Enter the password"
            onChange={changeHandler}
          ></input>

          <div className="btn">
            <button type="submit">
              <FaRegEdit />
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
