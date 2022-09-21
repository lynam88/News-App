"use strict";

/////////////////////////////////////////////////////////
// Hàm lấy dữ liệu từ LocalStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dữ liệu vào LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/////////////////////////////////////////////////////////
// lấy dữ liệu mảng userArr từ localStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

//Chuyển đổi dữ liệu JS Object sang Class Instance
const userArr = users.map((user) => parseUser(user)); // trả về mảng chứa các instance của class User

/////////////////////////////////////////////////////////
// Lấy dữ liệu user đang đăng nhập
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

// Hàm chuyển từ JS Object sang Class Instance của User Class
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    // 2 thuộc tính cá nhân hoá phần cài đặt trang tin cho riêng từng User
    userData.pageSize,
    userData.category
  );
  return user;
}

/////////////////////////////////////////////////////////
// Lấy dữ liệu todoArr từ LocalStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

// Chuyển đổi dữ liệu JS Object sang Class Instance
const todoArr = todos.map((todo) => parseTask(todo));

// Hàm chuyển từ JS Object sang Class Instance của Task Class
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
