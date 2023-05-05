const express = require("express");
const app = express();

const { Authentication } = require("../Middelware/authentication");
const { PostModel } = require("../models/post.model");

const PostRouter = express.Router();
PostRouter.use(Authentication);
PostRouter.get("/", async (req, res) => {
  try {
    const post = await PostModel.find({});
    res.send(post);
  } catch (err) {
    return res.send(err.message);
  }
});

PostRouter.get("/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    let data = await PostModel.find({ _id: Id });
    res.send(data);
  } catch (err) {
    res.send({ msg: "Error in getting data from Server", err });
  }
});

PostRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    let post = new PostModel(data);
    await post.save();
    res.send({ msg: "Post added Successfull" });
  } catch (err) {
    res.send({ msg: "Error while posting.", err });
  }
});

PostRouter.patch("/:id", async (req, res) => {
  const Id = req.params.id;
  const data = req.body;
  try {
    await PostModel.findByIdAndUpdate({ _id: Id }, data);
    res.send({ msg: "Update Successfull" });
  } catch (err) {
    res.send({ msg: "Error while Updating.", err });
  }
});

PostRouter.delete("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    await PostModel.findByIdAndDelete({ _id: Id });
    res.send({ msg: "Post Deleted Successfull" });
  } catch (err) {
    res.send({ msg: "Error while Updating.", err });
  }
});

module.exports = { PostRouter };
