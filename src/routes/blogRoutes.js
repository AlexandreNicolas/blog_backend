const express = require("express");
const PostModel = require("../models/PostModel");
const app = express();

app.get("/posts", async (request, response) => {
  const posts = await PostModel.find({});
  const sortPosts = posts.sort((a, b) => b.date - a.date)

  try {
    response.send(sortPosts);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/posts", async (request, response) => {
  request.body.date = Date.now();
  const posts = new PostModel(request.body);

  try {
    await posts.save();
    response.send(posts);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/posts/:id", async (request, response) => {
  try {
    request.body.date = Date.now();
    const posts = await PostModel.findByIdAndUpdate(request.params.id, request.body);
    if (!posts) {
      response.status(404).send("No post found");
    } 
    response.status(200).send();
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.delete("/posts/:id", async (request, response) => {
  try {
    const posts = await PostModel.findByIdAndDelete(request.params.id);
    if (!posts) {
      response.status(404).send("No post found");
    }
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;