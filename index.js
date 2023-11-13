const express = require("express");
const ConnectToDb = require("./src/config/dbconfig");
const blogrouter = require("./src/routes/blogRouter");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/blogs", blogrouter);

app.listen(8000, async () => {
  await ConnectToDb();
  console.log(`port listening on 8000`);
});
