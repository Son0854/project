// Element của trang
const formlogin = document.getElementById("formlogin");
const EmailElement = document.getElementById("Email");
const PasswordElement = document.getElementById("Password");

// Lắng nghe sự kiện submit form đăng nhập tài khoản
formlogin.addEventListener("submit", function (e) {

    // Ngăn chặn sự kiên load lại trang
    e.preventDefault();

    // Validate dữ liệu đầu vào

    // Lấy dữ liệu từ local về
    const userLocal = JSON.parse(localStorage.getItem("user")) || [];

    // Tìm kiếm email và mật khẩu người dùng có tồn tại trên local?
    const findUser = userLocal.find(
        (user) =>
            user.Email == EmailElement.value &&
            user.Password == PasswordElement.value
    );

    if (!findUser) {
        
        // Nếu không thì thông báo cho người dùng nhập lại dữ liệu
        alert("Email hoặc mật khẩu không đúng");
    } else {

        // Nếu có thì đăng nhập thành công và chuyển hướng về trang chủ
        alert("Đăng nhập thành công");
        window.location.href = "index.html";

        // Lưu thông tin của user đăng nhập lên local
        localStorage.setItem("userLogin", JSON.stringify(findUser));

    }

});