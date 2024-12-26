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
  const objectPagination = paginationHelper(req, coutProducts);
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

// [OATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect(`back`); // chuyển hướng về trang trước
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  console.log(req.body);
  const type = req.body.type;
  console.log(type);
  let ids = req.body.ids;
  ids = ids.split(", "); // split: convert string to array
  console.log(ids);

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" }); //{$in: ids} means to get those ids in the array
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" }); //{$in: ids} means to get those ids in the array
      break;
    default:
      break;
  }

  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { deleted: true, deleteAt: new Date() });

  res.redirect("back");
};

// những đoạn call API hay truy vấn dữ liệu thì dùng await
// vì trong database không biết bao nhiêu bản ghi vì v phải dùng await để chờ lấy ra số lượng bản ghi
