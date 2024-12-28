module.exports.createPost = (req, res, next) => {
    const { title, price, discountPercentage, stock } = req.body;
  
    // Helper function to check if a value is empty
    const isEmpty = (value) => !value || value.trim() === "";
  
    // Validate required fields
    if (isEmpty(title) || isEmpty(price) || isEmpty(discountPercentage) || isEmpty(stock)) {
      req.flash("error", "Vui lòng nhập đầy đủ thông tin");
      return res.redirect("back");
    }
  
    // Validate numeric fields
    if (isNaN(price) || isNaN(discountPercentage) || isNaN(stock)) {
      req.flash("error", "Giá, phần trăm giảm giá và số lượng phải là số");
      return res.redirect("back");
    }
  
    // Validate positive numbers
    if (price <= 0 || discountPercentage < 0 || discountPercentage > 100 || stock < 0) {
      req.flash("error", "Giá phải lớn hơn 0, phần trăm giảm giá từ 0 đến 100, và số lượng không âm");
      return res.redirect("back");
    }
  
    next(); // next ở đây là để chuyển hướng tới hàm tiếp theo
  };