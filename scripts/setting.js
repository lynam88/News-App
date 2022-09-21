"use strict";

/////////////////////////////////////////////////////////
//Nếu có người dùng đăng nhập mới hiển thị tin tức
if (currentUser) {
  // Khai báo biến cho các phần tử html
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  /////////////////////////////////////////////////////////
  // Bắt sự kiện click vào nút Save Settings
  btnSubmit.addEventListener("click", function () {
    if (validate()) {
      // Cập nhật lại currentUser khi người dùng chọn pageSize và category
      currentUser.pageSize = Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;

      // Lưu currentUser xuống localStorage
      saveToStorage("currentUser", currentUser);

      // Cập nhật lại mảng userArr
      const index = userArr.findIndex(
        (userItem) => userItem.username === currentUser.username
      );
      userArr[index] = currentUser;
      saveToStorage("userArr", userArr);

      // Reset lại form nhập và thông báo cài đặt thành công
      alert("Cài đặt thành công!");
      inputPageSize.value = "";
      inputCategory.value = "General";
    }
  });

  /////////////////////////////////////////////////////////
  // Hàm validate dữ liệu nhập của người dùng
  function validate() {
    // Kiểm tra xem News per page có phải số hợp lệ không
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("News per page không hợp lệ");
      return false;
    }

    // Kiểm tra xem đã chọn News Category chưa
    if (inputCategory.value === "") {
      alert("Vui lòng chọn News Category!");
      return false;
    }

    // Nếu người dùng nhập đúng thì trả về true
    return true;
  }
  /////////////////////////////////////////////////////////
  // Nếu chưa đăng nhập thì thông báo người dùng đăng nhập để truy cập vào trang
} else {
  alert("Vui lòng đăng nhập/ Đăng ký để truy cập ứng dụng");
  window.location.href = "../index.html";
}
