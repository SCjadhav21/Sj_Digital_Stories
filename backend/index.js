const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./Config/db");

app.use(express.json());
app.use(cors());

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to DataBase`);
  } catch (err) {
    console.log("Error: can't connect to mongodb");
  }
  console.log(`running on port ${process.env.port}`);
});
``;
