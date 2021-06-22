require('dotenv').config();
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogRoutes");

const app = express();
app.use(express.json());
app.use(cors());

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

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running...");
});
