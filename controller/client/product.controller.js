module.exports.index = (req, res) => {
  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm"
  });
};





// module là một đối tượng chứa các phương thức xử lý logic của ứng dụng
// exports dùng để xuất các phương thức xử lý logic của ứng dụng
// index là tên của phương thức xử lý logic của ứng dụng