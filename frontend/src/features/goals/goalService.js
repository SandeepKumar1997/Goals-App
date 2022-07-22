const addGoal = async (goal, token) => {
  const response = await fetch("http://localhost:5000/api/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(goal),
  });
  const data = await response.json();
  return data;
};

const getAllGoals = async (token) => {
  const response = await fetch("http://localhost:5000/api/goals", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const removeGoal = async (id, token) => {
  const response = await fetch(`http://localhost:5000/api/goals/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const goalService = {
  addGoal,
  getAllGoals,
  removeGoal,
};

export default goalService;
