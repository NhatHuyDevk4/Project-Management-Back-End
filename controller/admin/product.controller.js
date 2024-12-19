const Product = require("../../models/product.model");


// [GET] /admin/products
module.exports.index = async (req, res) => {

    let find = {
        deleted: false,
    }

    // lọc theo trạng thái 
    if(req.query.status){
        find.status = req.query.status;
    }
    // End lọc trạng thái

    // tìm kiếm
    if(req.query.keyword){
       //RegExp dùng để tìm kiếm chuỗi rồi trả về một đối tượng RegExp mới
        const regex = new RegExp(req.query.keyword, "i"); // i là không phân biệt hoa thường
        find.title = regex; // title là tên của trường cần tìm của đối tượng sản phẩm
    }

    const products = await Product.find(find);


    res.render("admin/pages/products/index", {
      pageTitle: "Trang sản phẩm",
      products: products,
    });
  };
  
  
  
  