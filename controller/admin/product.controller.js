const Product = require("../../models/product.model");


const filterStatusHelpers = require("../../helpers/filterStatus.helpers");
const searchHelper = require("../../helpers/search.helper");
// [GET] /admin/products/

// [GET] /admin/products/
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };

  // Filter
  const filterStatus = filterStatusHelpers(req.query);

  if(req.query.status) {
    find.status = req.query.status;
  }
  // End Filter

  // Search
  const objectSearch = searchHelper(req.query);
  if(objectSearch.regex){
    find.title = objectSearch.regex;
  }
  // End Search



  const products = await Product
    .find(find)

 
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
}
