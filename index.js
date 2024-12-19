const express = require("express");
require("dotenv").config();

const router = require("./router/client/index.router");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./views");


app.use(express.static("public")); // này là file tĩnh file tĩnh public ra bên ngoài ai cũng coi được

//ROUTES
router(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
