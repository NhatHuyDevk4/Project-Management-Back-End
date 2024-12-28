const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");
const filterStatusHelpers = require("../../helpers/filterStatus.helpers");
const searchHelper = require("../../helpers/search.helper");
const paginationHelper = require("../../helpers/pagiantion.helpers");

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
    .sort({ position: "desc" }) // sort: sắp xếp
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip); // skip: bỏ qua bao nhiêu sản phẩm

  const messages = {
    success: req.flash("success"),
    error: req.flash("error"),
  };

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    objectPagination: objectPagination,
    messages,
  });
};

// [OATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const { status, id } = req.params;

    await Product.updateOne({ _id: id }, { status: status });

    req.flash("success", "Cập nhật trạng thái thành công");
  } catch (error) {
    console.error("Error updating product status:", error);
    req.flash("error", "Cập nhật trạng thái thất bại");
  }

  res.redirect("back"); // chuyển hướng về trang trước
};
// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  let ids = req.body.ids;
  ids = ids.split(", "); // split: convert string to array

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" }); //{$in: ids} means to get those ids in the array
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm`
      );
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" }); //{$in: ids} means to get those ids in the array
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm`
      );
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", `Xóa thành công ${ids.length} sản phẩm`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne(
          {
            _id: id,
          },
          {
            position: position,
          }
        );
        req.flash("success", `Cập nhật vị trí thành công`);
      }
      break;
    default:
      break;
  }

  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );

  res.redirect("back");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {


  const messages = {
    success: req.flash("success"),
    error: req.flash("error"),
  };


  res.render("admin/pages/products/create", {
    pageTitle: "Thêm sản phẩm",
    messages,
  });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    // Nếu không nhập vị trí thì tự động tạo vị trí mới
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    // Nếu nhập vị trí thì chuyển vị trí thành số
    req.body.position = parseInt(req.body.position);
  }

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  const product = new Product(req.body); // Tạo ra một bản ghi mới
  await product.save(); // Lưu vào trong DB

  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// những đoạn call API hay truy vấn dữ liệu thì dùng await
// vì trong database không biết bao nhiêu bản ghi vì v phải dùng await để chờ lấy ra số lượng bản ghi
// Nếu gửi qua form thì dùng req.body
