"use strict";

/////////////////////////////////////////////////////////
//Nếu có người dùng đăng nhập mới hiển thị tin tức
if (currentUser) {
  // Khai báo biến cho các phần tử html
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");

  /////////////////////////////////////////////////////////
  // Gọi hàm để hiển thị danh sách nhiệm vụ todo của người dùng đang đăng nhập
  displayTodoList();

  // Hàm hiển thị thông tin Todo todoList
  function displayTodoList() {
    let html = "";

    // Lọc ra các nhiệm vụ todo của user đang đăng nhập từ mảng todoArr
    todoArr
      .filter((todo) => todo.owner === currentUser.username)
      .forEach(function (todo) {
        html += `
        <li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>
    `;
      });
    todoList.innerHTML = html;

    // Bắt các sự kiện khi click vào task
    eventToggleTasks();

    // Bắt các sự kiện khi click vào dấu x
    eventDeleteTasks();
  }

  /////////////////////////////////////////////////////////
  // Bắt sự kiện click vào nút Add để thêm tasks
  btnAdd.addEventListener("click", function () {
    // Kiểm tra xem người dùng đã nhập tên nhiệm vụ chưa
    if (inputTask.value.trim().length === 0) {
      alert("Vui lòng nhập nhiệm vụ cần làm!");
    } else {
      const todo = new Task(inputTask.value, currentUser.username, false);

      // Thêm task mới vào mảng todoArr
      todoArr.push(todo);

      // Lưu dữ liệu xuống localStorage
      saveToStorage("todoArr", todoArr);

      // Hiển thị danh sách các nhiệm vụ todo
      displayTodoList();

      // Xoá dữ liệu từ form nhập
      inputTask.value = "";
    }
  });

  /////////////////////////////////////////////////////////
  // Hàm bắt các sự kiện khi click vào task
  function eventToggleTasks() {
    // Lấy tất cả các phần tử li chứa thông tin của các task và bắt sự kiện khi click trên từng phần tử li này
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        // Tránh nút delete ra để không bị chồng sự kiện khi nhấn nút delete
        if (e.target !== liEl.children[0]) {
          // Toggle class checked
          liEl.classList.toggle("checked");
          console.log(liEl.textContent);

          // Tìm task vừa click vào
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === currentUser.username &&
              todoItem.task === liEl.textContent.slice(0, -1) // Lấy nội dung text chứa task, loại bỏ dấu x
          );

          // Thay đổi thuộc tính isDone của nó
          todo.isDone = liEl.classList.contains("checked") ? true : false;

          // Lưu dữ liệu xuống localStorage
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  /////////////////////////////////////////////////////////
  // Hàm bắt sự kiện xoá các tasks
  function eventDeleteTasks() {
    // Lấy tất cả các phần tử nút delete để bắt sự kiện click trên từng phần tử ấy
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        // Xác nhận trước khi xóa
        const isDelete = confirm("Bạn chắc chắn muốn xóa chứ?");

        if (isDelete) {
          // Tìm vị trí của task được nhấn xóa trong mảng todoArr
          const index = todoArr.findIndex(
            (item) =>
              // Tìm task theo username đang đăng nhập
              item.owner === currentUser.username &&
              // Tìm task theo tên của các mục li đã loại bỏ phần tử delete (x)
              item.task === closeEl.parentElement.textContent.slice(0, 1)
          );
          // Xóa task đó ra khỏi mảng todoArr
          todoArr.splice(index, 1);

          // Cập nhật dữ liệu xuống localStorage
          saveToStorage("todoArr", todoArr);

          // Hiển thị lại danh sách các todo
          displayTodoList();
        }
      });
    });
  }

  /////////////////////////////////////////////////////////
  // Nếu chưa đăng nhập thì thông báo người dùng đăng nhập để truy cập vào trang
} else {
  alert("Vui lòng đăng nhập/ Đăng ký để truy cập ứng dụng");
  window.location.href = "../index.html";
}
