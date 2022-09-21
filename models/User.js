"use strict";

/////////////////////////////////////////////////////////
//Tạo Class User để chứa các thông tin về user trong userArr

class User {
  // Hàm khởi tạo
  constructor(
    firstname,
    lastname,
    username,
    password,
    pageSize = 10,
    category = "business"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;

    // Cá nhân hoá phần cài đặt trang tin cho riêng từng User
    this.pageSize = pageSize;
    this.category = category;
  }
}
/////////////////////////////////////////////////////////
//Tạo Class Task để chứa các thông tin về Task trong Todo List

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
