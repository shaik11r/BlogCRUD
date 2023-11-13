const express = require("express");
const ConnectToDb = require("./src/config/dbconfig");
const blogrouter = require("./src/routes/blogRouter");
const userRouter = require("./src/routes/userRoutes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/blogs", blogrouter);
app.use("/", userRouter);
app.listen(8000, async () => {
  await ConnectToDb();
  console.log(`port listening on 8000`);
});
