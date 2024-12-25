module.exports = (req, countRecords) => {
  const objectPagination = {
    currentPage: 1,
    limitItems: 4
  }

  if(req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  // CT lấy trang hiện tại - 1 * số lượng sản phẩm
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

  // CT Lấy tổng sản phẩm chia cho số lượng sản phẩm để hiển thị số trang
  objectPagination.totalPage = Math.ceil(countRecords/objectPagination.limitItems);

  return objectPagination;
}