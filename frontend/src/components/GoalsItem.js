import React from "react";
import "./GoalsItem.css";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

const GoalsItem = (props) => {
  const dispatch = useDispatch();
  const removeItem = () => {
    dispatch(deleteGoal(props.goal._id));
  };
  return (
    <div className="goal">
      <div className="header-goals">
        <div>{new Date(props.goal.createdAt).toLocaleString("en-US")}</div>
        <div onClick={removeItem}>
          <FaTrash />
        </div>
      </div>
      <p>{props.goal.text}</p>
    </div>
  );
};

export default GoalsItem;
