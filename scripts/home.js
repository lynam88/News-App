"use strict";

/////////////////////////////////////////////////////////
// Khai báo biến cho các phần tử html
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

/////////////////////////////////////////////////////////
// Gọi hàm displayHome để hiển thị màn hình ứng với trạng thái đăng nhập của người dùng
displayHome();

// Hàm hiển thị nội dung trang Home ứng với trạng thái đăng nhập của người dùng
function displayHome() {

  //Nếu có người đăng nhập thì ẩn các phần tử html có id 'login-modal' và hiển thị phần tử html có id 'main-content'
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";

    // Thêm thông báo welcomeMessage
    welcomeMessage.textContent = `Welcome ${currentUser.firstname}`;

    //Nếu không có người đăng nhập thì ẩn các phần tử html có id 'main-content' và hiển thị phần tử html có id 'login-modal'
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

/////////////////////////////////////////////////////////
// Bắt sự kiện click vào nút Logout
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Bạn chắc chắn muốn Logout chứ?");
  if (isLogout) {
    // Gán giá trị currentUser về null để biểu hiện chưa có ai đăng nhập
    currentUser = null;

    // Cập nhật dữ liệu xuống localStorage
    saveToStorage("currentUser", currentUser);

    // Hiển thị màn hình ở trạng thái chưa có user đăng nhập
    displayHome();
  }
});
