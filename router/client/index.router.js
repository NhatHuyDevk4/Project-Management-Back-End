const productRoutes = require("./product.route");
const homeRoutes = require("./home.router");
module.exports = (app) => {
  app.get("/", homeRoutes);

  app.use("/products", productRoutes);
};
