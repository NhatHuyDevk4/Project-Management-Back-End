const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  });

  const newProdcut = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(2); // công thức tính giá mới là giá cũ trừ đi phần trăm giảm giá
    return item;
  }); 

  console.log("Product", products);

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProdcut,
  });
};

// module là một đối tượng chứa các phương thức xử lý logic của ứng dụng
// exports dùng để xuất các phương thức xử lý logic của ứng dụng
// index là tên của phương thức xử lý logic của ứng dụng
