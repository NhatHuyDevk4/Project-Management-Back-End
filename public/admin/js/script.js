const listButtonStatus = document.querySelectorAll("[button-status]");
if (listButtonStatus.length > 0) {
  let url = new URL(window.location.href);

  listButtonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
// End Button Status

// Form Search
const formSearch = document.querySelector("[form-search]");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();

    const keyword = event.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}
// End Form Search

// Button Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
console.log(listButtonPagination);
if (listButtonPagination.length > 0) {
  let url = new URL(window.location.href); // cái này là lấy ra url hiện tại

  listButtonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href; // cái này là chuyển trang
    });
  });
}
// End Button Pagination

// Button Change Status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if(listButtonChangeStatus.length > 0) {
  listButtonChangeStatus.forEach(button => {
    const formChangeStatus = document.querySelector("[form-change-status]");
    button.addEventListener("click", () => {
      const currentStatus = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      const path = formChangeStatus.getAttribute("data-path");
      let changeStatus = currentStatus == "active" ? "inactive" : "active";

      const action = `${path}/${changeStatus}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      console.log(currentStatus, id);
      formChangeStatus.submit();
    })
  })
}
// End Button Change Status


// CheckBox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkAll']");
  const listInputId = checkboxMulti.querySelectorAll("input[name='id']");
  console.log(inputCheckAll);
  console.log(listInputId);

  inputCheckAll.addEventListener("click", () => {
    if(inputCheckAll.checked){
      listInputId.forEach(input => {
        input.checked = true;
      })
    } else {
      listInputId.forEach(input => {
        input.checked = false;
      })
    }
  })

  listInputId.forEach(input => {
    input.addEventListener("click", () => {
      // lấy ra số lượng input đã được check
      const countInputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length; 
      
      // lấy ra dộ dài của list input
      const lengthInput = listInputId.length;

      if(countInputChecked == lengthInput){
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }

    })
  })
}
// End CheckBox Multi

// Form Change Multi

// End Form Change Multi