console.log("Hello");
// Lấy ra element của trang
const formregister = document.getElementById("formregister");
const userNameElement = document.getElementById("userName");
// const PhoneElement = document.getElementById("Phone");
const EmailElement = document.getElementById("Email");
const PasswordElement = document.getElementById("Password");
const rePasswordElement = document.getElementById("rePassword");

/**
 * Validate địa chỉ email
 * @param {*} email : Chuỗi email người dùng nhập vào
 * @returns : Xuất dữ liệu nếu email đúng định dạng, undifined nếu email không đúng định dạng
 * Author: Thái Minh Quang(15/03/2025)
 */
// function validateEmail (Email) {
//   return String(Email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };

//Element liên quan đến lỗi
const userNameError = document.getElementById("userNameError");
const EmailError = document.getElementById("EmailError");
const PasswordError = document.getElementById("PasswordError");
const rePasswordError = document.getElementById("rePasswordError");

// Lấy dữ liệu từ localStorage
const userLocal = JSON.parse(localStorage.getItem("user")) || [];

// Lắng nghe sự kiện submit form đăng ký tài khoản
formregister.addEventListener("submit", function (e) {
    // Ngăn chặn sự kiện load lại trang
    e.preventDefault();

    // Validate dữ liệu đầu vào
    if (!userNameElement.value) {
        // Hiển thị lỗi
        userNameError.style.display = "block";
    } else {
        // Ẩn lỗi
        userNameError.style.display = "none";
    }

    // Validate dữ liệu đầu vào
    if (!EmailElement.value) {
        // Hiển thị lỗi
        EmailError.style.display = "block";
    } else {
        // Ẩn lỗi
        EmailError.style.display = "none";
        // Kiểm tra định dạng email
        // if (!validateEmail(EmailElement.value)) {
        //     // Hiển thị lỗi
        //     EmailError.style.display = "block";
        //     EmailError.innerHTML = "Email không đúng định dạng.";
        // } //else {
        //     //Ẩn lỗi
        //     EmailError.style.display = "none";
        // }
    }

    // Validate dữ liệu đầu vào
    if (!PasswordElement.value) {
        // Hiển thị lỗi
        PasswordError.style.display = "block";
    } else {
        // Ẩn lỗi
        PasswordError.style.display = "none";
    }

    // Validate dữ liệu đầu vào
    if (!rePasswordElement.value) {
        // Hiển thị lỗi
        rePasswordError.style.display = "block";
    } else {
        // Ẩn lỗi
        rePasswordError.style.display = "none";
    }

    // Kiểm tra mật khẩu với nhập lại mật khẩu
    if (PasswordElement.value !== rePasswordElement.value) {
        rePasswordError.style.display = "block";
        rePasswordError.innerHTML = "Mật khẩu không khớp";
    } else {
        rePasswordError.style.display = "none";
    }

    // Gửi dữ liệu từ form lên localStorage
    if (userNameElement.value &&
        EmailElement.value &&
        PasswordElement.value &&
        rePasswordElement.value &&
        PasswordElement.value == rePasswordElement.value) {
        
        // Lấy dữ liệu từ form gộp thành đối tượng user
        const user = {
            userID: Math.ceil(Math.random() * 100000000),
            userName: userNameElement.value,
            Email: EmailElement.value,
            Password: PasswordElement.value,
            rePassword: rePasswordElement.value,
        };

        // Push user vào trong mảng userLocal
        userLocal.push(user);

        // Lưu trữ dữ liệu trên local
        localStorage.setItem("user", JSON.stringify(userLocal));

        // Chuyển hướng về trang đăng nhập
        setTimeout(function () {           
            window.location.href = "login.html";
        }, 1000)

    }
});