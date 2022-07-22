import React, { useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalsForm from "../components/GoalsForm";
import GoalsItem from "../components/GoalsItem";
import Spinner from "../components/Spinner";
import { getGoal, goalActions } from "../features/goals/goalSlice";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getGoal());

    return () => {
      dispatch(goalActions.reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Hello {user && user.name}</h1>
      <h4 style={{ color: "gray", marginTop: "1rem" }}>Let's add some goals</h4>
      <GoalsForm />

      <div className="goals-group">
        {goals.length > 0 ? (
          goals.map((item) => <GoalsItem key={item._id} goal={item} />)
        ) : (
          <div>
            <p>Please add some Goals !!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
