
// [GET] /home
module.exports.index = (req, res) => {
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ"
  });
};





// module là một đối tượng chứa các phương thức xử lý logic của ứng dụng
// exports.index là phương thức xử lý logic của ứng dụng
// index là tên của phương thức xử lý logic của ứng dụng