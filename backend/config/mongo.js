const mongoose = require("mongoose");

const makeConnectionMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`DataBase is connected with : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

module.exports = makeConnectionMongo;
