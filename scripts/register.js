"use strict";

/////////////////////////////////////////////////////////
// Khai báo biến cho các phần tử html
const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

/////////////////////////////////////////////////////////
// Bắt sự kiện click vào nút Register
btnSubmit.addEventListener("click", function () {
  // Lấy dữ liệu nhập vào từ người dùng nhập trong form
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );

  // Check validate
  const isValidate = validate(user);

  if (isValidate) {
    // Thêm user vào mảng userArr
    userArr.push(user);

    // Update dữ liệu userArr xuống LocalStorage
    saveToStorage("userArr", userArr);

    // Thông báo đăng ký thành công
    alert("Đăng ký thành công!");

    // Điều hướng sang trang Login
    window.location.href = "../pages/login.html";
  }
});

/////////////////////////////////////////////////////////
// Hàm validate thông tin đăng ký của người dùng trên form
// Hàm này trả về true nếu hợp lệ và false nếu không hợp lệ

function validate(user) {
  // 1. Không có trường nào bị bỏ trống
  if (inputFirstname.value.trim().length === 0) {
    alert("Vui lòng nhập First Name!");
    return false;
  }

  if (inputLastname.value.trim().length === 0) {
    alert("Vui lòng nhập Last Name!");
    return false;
  }

  if (inputUsername.value.trim().length === 0) {
    alert("Vui lòng nhập Username!");
    return false;
  }

  // Vì khoảng trắng cũng là 1 ký tự thoả yêu cầu đặt Password nên ta không dùng phương thức .trim.length === 0 như trên

  if (inputPassword.value === "") {
    alert("Vui lòng nhập Password!");
    return false;
  }

  if (inputPasswordConfirm.value === "") {
    alert("Vui lòng nhập Confirm Password!");
    return false;
  }

  // 2. Username không được trùng với Username của các người dùng trước đó

  // Nếu tồn tại username trùng với username người dùng nhập thì báo lỗi
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].username === user.username) {
      alert("Username đã tồn tại!");
      return false;
    }
  }

  // 3. Password và Confirm Password phải giống nhau
  if (user.password !== inputPasswordConfirm.value) {
    alert("Password và Confirm Password phải giống nhau!");
    return false;
  }

  // 4. Password phải có nhiều hơn 8 ký tự
  if (user.password.length <= 8) {
    alert("Password phải có nhiều hơn 8 ký tự!");
    return false;
  }

  // Nếu người dùng nhập đúng thì trả về true
  return true;
}
