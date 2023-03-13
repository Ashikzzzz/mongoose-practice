const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
//   console.log(DATABASE_LOCAL);
  console.log("database connected".red.bold);
});

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is running at ${port}`.yellow.bold);
});
