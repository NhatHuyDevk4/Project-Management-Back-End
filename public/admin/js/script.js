console.log("Hello World huy");

// Bộ lọc
const boxFilter = document.querySelector("[box-filter]");
if (boxFilter) {
  let url = new URL(location.href); // cái này là lấy url hiện tại

  boxFilter.addEventListener("change", () => {
    const value = boxFilter.value;

    if (value) {
      url.searchParams.set("status", value);
      // searchParams là một đối tượng URLSearchParams, nó chứa tất cả các tham số truy vấn của URL
      // set() là một phương thức của URLSearchParams, nó thêm hoặc cập nhật một cặp giá trị tham số truy vấn
    } else {
      url.searchParams.delete("status");
    }

    location.href = url.href; // href là một thuộc tính của window.location, nó trả về hoặc thiết lập URL của trang hiện tại
  });

  // hiển thị lựa chọn mặt định
  const statusCurrent = url.searchParams.get("status");
  if (statusCurrent) {
    boxFilter.value = statusCurrent;
  } // phương thức này trả về giá trị của tham số truy vấn được chỉ định
}
// Hết bộ lọc

// tìm kiếm
const formSearch = document.querySelector("[form-search]");
if(formSearch){
    let url = new URL(location.href);

    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = formSearch.keyword.value//keyword là tên thẻ dùng để lấy giá trị của thẻ input có name="keyword"
        if(value){
            url.searchParams.set("keyword", value);
        } else {
            url.searchParams.delete("keyword");
        }

        location.href = url.href;
    })

    // hiển thị từ khóa mặt định
    const valueCurrent = url.searchParams.get("keyword");
    if(valueCurrent){
        formSearch.keyword.value = valueCurrent;
    }
}
//hết tìm kiếm