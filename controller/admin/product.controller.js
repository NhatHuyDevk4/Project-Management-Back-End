const Product = require("../../models/product.model");

const filterStatusHelpers = require("../../helpers/filterStatus.helpers");
const searchHelper = require("../../helpers/search.helper");
const paginationHelper = require("../../helpers/pagiantion.helpers");
// [GET] /admin/products/

// [GET] /admin/products/
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Filter
  const filterStatus = filterStatusHelpers(req.query);

  if (req.query.status) {
    find.status = req.query.status;
  }
  // End Filter

  // Search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // End Search

  // Pagination
  const coutProducts = await Product.countDocuments(find);
  const objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    coutProducts
  );
  // End Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip); // skip: bỏ qua bao nhiêu sản phẩm

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    objectPagination: objectPagination,
  });
};

// những đoạn call API hay truy vấn dữ liệu thì dùng await
// vì trong database không biết bao nhiêu bản ghi vì v phải dùng await để chờ lấy ra số lượng bản ghi
