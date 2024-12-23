const Product = require("../../models/product.model");

const filterStatusHelpers = require("../../helpers/filterStatus.helpers");
const searchHelper = require("../../helpers/search.helper");
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
  const objectPagination = {
    currentPage: 1,
    limitItems: 4,
  };

  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;

  console.log(objectPagination.skip);

  // CT: (trang hiện tại - 1) * số lượng sản phẩm trên 1 trang

  // lấy ra số trang sản phẩm CT: Math.ceil(số lượng sản phẩm / số lượng sản phẩm trên 1 trang)
  const coutProducts = await Product.countDocuments(find);
  const totalPage = Math.ceil(coutProducts / objectPagination.limitItems);
  objectPagination.totalPage = totalPage;
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