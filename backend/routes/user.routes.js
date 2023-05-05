const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Authentication } = require("../Middelware/authentication");
const { UserModel } = require("../models/user.model");

const app = express();
app.use(express.json());

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  let { name, email, mobile, password, address } = req.body;
  try {
    const users = await UserModel.find({ email });
    if (users.length > 0) {
      res.send({
        msg: "email is already exist in database",
        alert: "email is already register",
      });
    } else {
      bcrypt.hash(password, 8, async (err, hash) => {
        if (err) {
          console.log(err);
          res.send({ msg: err, alert: "something went wrong" });
        } else {
          const user = new UserModel({
            name,
            address,
            email,
            mobile,
            password: hash,
          });
          await user.save();
          res.send({
            msg: "user Registered",
            alert: "Registered successfully",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: err, alert: "something went wrong" });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          res.send({ msg: err.message, alert: "something went wrong" });
        } else if (result) {
          const token = jwt.sign({ userId: user._id }, process.env.key);

          res.send({
            msg: "Login Successfull",
            alert: "Logged In",
            token: token,
          });
        } else {
          res.send({ msg: "Login Failure", alert: "Wrong Credntials" });
        }
      });
    } else {
      res.send({ msg: "Login Failure", alert: "Wrong Credntials" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: err, alert: "something went wrong" });
  }
});
UserRouter.use(Authentication);
UserRouter.get("/personalDetail", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await UserModel.findOne({ _id: userId });
    res.send({ data: user, alert: "user data found" });
  } catch (err) {
    console.log(err);
    res.send({ massage: err.message, alert: "Something went wrong" });
  }
});

module.exports = { UserRouter };
