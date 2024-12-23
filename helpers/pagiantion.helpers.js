module.exports = async (objectPagination, query, countProducts) => {
    
  if (query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;

  console.log(objectPagination.skip);

  // CT: (trang hiện tại - 1) * số lượng sản phẩm trên 1 trang

  // lấy ra số trang sản phẩm CT: Math.ceil(số lượng sản phẩm / số lượng sản phẩm trên 1 trang)
  
  const totalPage = Math.ceil(countProducts / objectPagination.limitItems);
  objectPagination.totalPage = totalPage;
  // End Pagination

  return objectPagination;
}