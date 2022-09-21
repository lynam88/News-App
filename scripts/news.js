"use strict";

//Nếu có người dùng đăng nhập mới hiển thị tin tức
if (currentUser) {
  /////////////////////////////////////////////////////////
  // Khai báo biến cho các phần tử html
  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  // Khai báo biến totalResults - số lượng bài viết tối đa mà API có thể trả về
  let totalResults = 0;

  /////////////////////////////////////////////////////////
  // Gọi hàm lấy dữ liệu từ API và hiển thị list News ra ứng dụng
  getDataNews("us", 1);

  // Hàm lấy dữ liệu từ API và hiển thị list News ra ứng dụng
  async function getDataNews(country, page) {
    try {
      // Kết nối API để lấy dữ liệu
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines/?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=92f04b73ac4c442fab598973a2430cbe`
      );
      const data = await res.json();

      // Check lỗi request quá nhiều lần trong ngày (kết nối đến API vượt số lần cho phép trong ngày)
      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }

      // Check lỗi khi chạy tập tin không thông qua server ==> chạy trên server sẽ không có lỗi này
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      // Gọi hàm để hiển thị list News
      displayNewsList(data);
    } catch (err) {
      // Thông báo lỗi
      alert("Lỗi: " + err.message);
    }
  }

  /////////////////////////////////////////////////////////
  // Hàm kiểm tra điều kiện ẩn và ẩn nút Previous
  function checkBtnPrev() {
    // Nếu page Number là 1 thì ẩn đi
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }

  /////////////////////////////////////////////////////////
  // Hàm kiểm tra điều kiện ẩn và ẩn nút Next
  function checkBtnNext() {
    // Nếu page Number bằng với trang cuối cùng [tính bằng cách làm tròn lên biểu thức:(tổng số tin tức tối đa mà API trả về / số tin tức hiển thị trên 1 trang ứng dụng)]
    if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  /////////////////////////////////////////////////////////
  // Bắt sự kiện click vào nút Previous
  btnPrev.addEventListener("click", function () {
    // Gọi hàm để lấy dữ liệu và hiển thị danh sách các news trước đó
    getDataNews("us", --pageNum.textContent);
  });

  /////////////////////////////////////////////////////////
  // Bắt sự kiện click vào nút Next
  btnNext.addEventListener("click", function () {
    // Gọi hàm để lấy dữ liệu và hiển thị danh sách các news tiếp theo
    getDataNews("us", ++pageNum.textContent);
  });

  /////////////////////////////////////////////////////////
  // Hàm hiển thị list News lên trang
  function displayNewsList(data) {
    // Lấy giá trị cho biến totalResults
    totalResults = data.totalResults;

    // Gọi hàm hiển thị các nút Previous và Next theo yêu cầu đề bài
    checkBtnPrev();
    checkBtnNext();

    let html = "";
    // Tạo HTML element để hiển thị
    // no_image_available.jpg để thay thế cho 1 số ảnh có giá trị đường dẫn là null tức không hiển thị được
    data.articles.forEach(function (article) {
      html += `
    <div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src=${
                    article.urlToImage
                      ? article.urlToImage
                      : "no_image_available.jpg"
                  }
                    class="card-img"
                    alt=${article.title}>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href=${article.url} target="_blank"
                      class="btn btn-primary">View</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
    });

    newsContainer.innerHTML = html;
  }
  /////////////////////////////////////////////////////////
  // Nếu chưa đăng nhập thì thông báo người dùng đăng nhập để truy cập vào trang
} else {
  alert("Vui lòng đăng nhập/ Đăng ký để truy cập ứng dụng");
  window.location.href = "../index.html";
}
