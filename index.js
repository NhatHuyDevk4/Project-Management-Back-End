const express = require("express");
const router = require('./router/client/index.router');
const app = express();
const port = 3002;

app.set('view engine', 'pug');
app.set('views', './views');

router(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
