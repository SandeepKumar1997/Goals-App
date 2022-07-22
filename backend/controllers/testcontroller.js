const User = require("../model/userSchema");
const Goal = require("../model/GoalSchema");

exports.getRoute = async (req, res, next) => {
  const getGoals = await Goal.find({ user: req.user.id });
  res.status(200).json(getGoals);
};

exports.postRoute = async (req, res, next) => {
  if (!req.body.text) {
    return res.status(400).json({ message: "Please enter the text" });
  }
  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text,
  });
  res.status(200).json(goal);
};

exports.updateRoute = async (req, res, next) => {
  const goalID = await Goal.findById(req.params.id);
  if (!goalID) {
    return res.status(401).json({ message: "Goal not found" });
  }

  if (!req.user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (goalID.user.toString() !== req.user.id) {
    return res
      .status(400)
      .json({ message: "User not authorized to access this" });
  }
  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateGoal);
};

exports.deleteRoute = async (req, res, next) => {
  const goalID = await Goal.findById(req.params.id);
  if (!goalID) {
    return res.status(401).json({ message: "Goal not found" });
  }

  if (!req.user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (goalID.user.toString() !== req.user.id) {
    return res
      .status(400)
      .json({ message: "User not authorized to delete this" });
  }

  await goalID.remove();

  res.status(200).json({ id: req.params.id });
};
