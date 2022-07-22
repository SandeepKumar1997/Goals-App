const express = require("express");
const dotenv = require("dotenv");
const app = express();
const goals = require("./routes/testroute");
const users = require("./routes/userRoutes");
const makeConnectionMongo = require("./config/mongo");

dotenv.config({ path: "./config/config.env" });
makeConnectionMongo();

app.use(express.json());

const PORT = process.env.PORT;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api/goals", goals);
app.use("/api/users", users);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
