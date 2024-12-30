const Product = require("../../models/product.model");

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const newProdcut = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(2); // công thức tính giá mới là giá cũ trừ đi phần trăm giảm giá
    return item;
  }); 

  console.log("Product", products);

  const messages = {
    success: req.flash("success"),
    error: req.flash("error"),
  };

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProdcut,
    messages
  });
};

// [GET] /products/detail/:slug
module.exports.slug = async (req, res) => {

  console.log(req.params.slug);

  const slug = req.params.slug;

  const product = await Product.findOne({
    slug: slug,
    status: "active",
    deleted: false,
  })

  res.render("client/pages/products/detail", {
    pageTitle: "Trang chi tiết sản phẩm",
    product: product
  })
}

// module là một đối tượng chứa các phương thức xử lý logic của ứng dụng
// exports dùng để xuất các phương thức xử lý logic của ứng dụng
// index là tên của phương thức xử lý logic của ứng dụng
