const express = require("express");
require("dotenv").config();

const router = require("./router/client/index.router");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./views");

//ROUTES
router(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
