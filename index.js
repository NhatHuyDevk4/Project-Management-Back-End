const express = require("express");
var methodOverride = require('method-override');
// Thằng này dùng để nhận dữ liệu từ form gửi lên
var bodyParser = require('body-parser');
// Thằng flash là thư viện dùng để hiển thị thông báo
const flash = require('connect-flash');
// Thằng cookie-parser là thư viện dùng để lưu cookie
const cookieParser = require('cookie-parser');
// thằng session là thư viện dùng để lưu session
const session = require('express-session');
require("dotenv").config();
const database = require('./config/database');
const systemConfig = require('./config/system');
const router = require("./router/client/index.router");
const routerAdmin = require("./router/admin/index.router");
database.connect();

const app = express();
const port = process.env.PORT || 3000;

// Này là để nhận dữ liệu từ form bằng method POST gửi lên
app.use(methodOverride('_method'));

// Này là để nhận dữ liệu từ form bằng method POST gửi lên
app.use(bodyParser.urlencoded({ extended: false }));



app.set("view engine", "pug");
app.set("views", "./views");

// Flash thư viện dùng để hiển thị thông báo
app.use(cookieParser('HGKDGNFJGHRUFHJ'));
app.use(session({ 
  secret: 'HGKDGNFJGHRUFHJ', 
  resave: false, 
  saveUninitialized: true, 
  cookie: { maxAge: 60000 } 
}));
app.use(flash());

// End Flash


// APP locals variable để dùng toàn bộ server
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public")); // này là file tĩnh file tĩnh public ra bên ngoài ai cũng coi được

//ROUTES
routerAdmin(app);
router(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
