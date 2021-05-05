const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const users = require("./routes/users");
const auth = require("./routes/auth");
const posts = require("./routes/posts");
const likes = require("./routes/likes");
const comments = require("./routes/comments");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const connectionString = `${config.get("db")}`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(" -info: Connected Successfully To mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());

app.use("/users", users);
app.use("/auth", auth);
app.use("/posts", posts);
app.use("/likes", likes);
app.use("/comments", comments);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(` -info: Listening on port ${port}`));
