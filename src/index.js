require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogRoutes");

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PSWD + 
  "@clusterleadeasy.hswam.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

app.use(blogRouter);

app.listen(3001, () => {
  console.log("Server is running...");
});
