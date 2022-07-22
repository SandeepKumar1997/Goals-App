import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postGoal } from "../features/goals/goalSlice";
import "./GoalForm.css";
const GoalsForm = () => {
  const [goal, setGoal] = useState("");

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setGoal(() => e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(postGoal({ text: goal }));
    setGoal("");
  };
  return (
    <div className="goal-container">
      <form className="goal-form" onSubmit={submitHandler}>
        <input
          type="text"
          id="goal"
          name="goal"
          value={goal}
          onChange={onChangeHandler}
        ></input>
        <button>Add Goal</button>
      </form>
    </div>
  );
};

export default GoalsForm;
