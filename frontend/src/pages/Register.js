import React, { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, authActions } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSending, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
      toast.success("Successfully Registered");
    }

    dispatch(authActions.reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const { name, email, password, password2 } = data;
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
    if (password !== password2) {
      toast.error("Please enter matching password");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isSending) {
    return <Spinner />;
  }

  return (
    <>
      <div className="login-header">
        <FaRegUser />
        <h1>Register</h1>
        <h3>Please create your account</h3>
      </div>
      <div className="form-section">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter Name"
            autoComplete="off"
            onChange={changeHandler}
          ></input>
          <input
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={changeHandler}
          ></input>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Enter the password"
            onChange={changeHandler}
          ></input>
          <input
            id="password2"
            name="password2"
            type="password"
            value={password2}
            placeholder="Confirm Password"
            onChange={changeHandler}
          ></input>
          <div className="btn">
            <button type="submit">
              <FaRegUser />
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
