const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema, "products");
// tham số thứ 1 là tên model
// tham số thứ 2 là schema
//tham số thứ 3 là tên bảng trong database

module.exports = Product;
// Tác dụng của thằng mongoose là để tạo ra các model và tuân theo các thuộc tính của schema