"use strict";

/////////////////////////////////////////////////////////
// Khai báo biến cho các phần tử html
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

/////////////////////////////////////////////////////////
// Bắt sự kiện click vào nút Login
btnSubmit.addEventListener("click", function () {
  // Kiểm tra xem người dùng đã nhập đủ Username và Password chưa
  const isValidate = validate();
  if (isValidate) {
    // Tìm kiếm trong userArr thông tin user người dùng nhập vào có đúng không
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );

    if (user) {
      // Thông báo người dùng đăng nhập thành công
      alert("Đăng nhập thành công!");

      // Lưu thông tin người dùng hiện tại xuống dưới LocalStorage, để các trang khác có thể lấy được dữ liệu về người dùng đã đăng nhập
      saveToStorage("currentUser", user);

      // Chuyển về trang Home
      window.location.href = "../index.html";
    } else {
      alert("Thông tin đăng nhập không đúng, vui lòng kiểm tra lại!");
    }
  }
});

/////////////////////////////////////////////////////////
// Hàm validate dữ liệu người dùng nhập vào
function validate() {
  // Kiểm tra xem người dùng đã nhập đủ Username và Password hay chưa
  if (!inputUsername.value) {
    alert("Vui lòng nhập Username!");
    return false;
  }

  if (!inputPassword.value) {
    alert("Vui lòng nhập Password!");
    return false;
  }

  return true;
}
