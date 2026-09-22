# TechZone - Modern E-Commerce UI/UX Static Prototype

> **LƯU Ý QUAN TRỌNG / IMPORTANT NOTICE:**  
> Dự án này là một **bộ mẫu giao diện tĩnh độc lập (Static UI/UX Prototype)**, được thiết kế nhằm mục đích làm quy chuẩn giao diện (Design System & Reference) cho đội ngũ kỹ thuật viên chuyển đổi sang mã nguồn Java Servlet/JSP trong học phần PRJ301.  
> **Dự án hoàn toàn không chứa mã nguồn backend, không gọi API từ máy chủ và không kết nối cơ sở dữ liệu.** Mọi trạng thái tương tác (giỏ hàng, danh sách đơn hàng, phiên đăng nhập) đều được mô phỏng mượt mà thông qua dữ liệu tĩnh (hardcoded data) và `localStorage` của trình duyệt.

---

## 1. Bối Cảnh & Mục Tiêu Dự Án

### 1.1. Dự án gốc (Original Project)
Hệ thống **TechZone** là đồ án môn học Web Java (PRJ301) xây dựng theo kiến trúc MVC cổ điển sử dụng Java Servlet, JavaServer Pages (JSP), JSTL và cơ sở dữ liệu SQL Server. Giao diện cũ gặp nhiều hạn chế về mặt phân cấp thị giác, sử dụng các thuộc tính CSS cố định (`transform: translateX(-150px)`, `margin-left: 280px`), thiếu tính đáp ứng trên thiết bị di động và luồng trải nghiệm khách hàng bị phân mảnh.

### 1.2. Mục tiêu cải tiến UI/UX
1. **Thiết kế hiện đại, chuyên nghiệp**: Xây dựng lại giao diện theo phong cách siêu thị công nghệ cao cấp (tương tự CellphoneS, FPT Shop, Apple Store), ưu tiên sự sạch sẽ, tin cậy và tối ưu tỷ lệ chuyển đổi (conversion-oriented).
2. **Bảo tồn trọn vẹn nghiệp vụ (Business Semantics)**: Giữ đúng 3 danh mục sản phẩm cốt lõi (*Laptops, Smartphones, Phụ Kiện*), thương hiệu thực tế, phí vận chuyển toàn quốc 150.000₫, cơ chế voucher giảm giá (% hoặc tiền mặt), và chu trình 4 trạng thái đơn hàng (`PROCESSING` -> `PENDING` -> `COMPLETED` / `CANCELED`).
3. **Trải nghiệm tương tác chân thực (High-Fidelity Interaction)**: Hỗ trợ tìm kiếm, lọc đa tiêu chí (Faceted Search), tính toán giỏ hàng, áp mã khuyến mãi, đặt hàng và chuyển trạng thái đơn hàng thời gian thực mà không cần cài đặt backend.
4. **Chuẩn bị hoàn hảo cho bước tích hợp Servlet/JSP**: Cấu trúc HTML ngữ nghĩa rõ ràng, phân tách mạch lạc giữa Giao diện (HTML/CSS), Dữ liệu mô phỏng (`data.js`) và Logic tương tác (`app.js`, `cart.js`, `products.js`).

---

## 2. Công Nghệ Sử Dụng (Tech Stack)

- **Ngôn ngữ**: HTML5 ngữ nghĩa, CSS3 hiện đại, Vanilla JavaScript (ES6+).
- **CSS Framework**: [Bootstrap 5.3.3](https://getbootstrap.com/) thông qua CDN chính thức.
- **Icon System**: [Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/) qua CDN.
- **Font chữ**: Google Fonts [Inter](https://fonts.google.com/specimen/Inter).
- **Lưu trữ trạng thái client**: Web Storage API (`localStorage`).
- **Không sử dụng**: React, Vue, Angular, Node.js/npm, Webpack, Vite, Tailwind build process, server runtime hay cơ sở dữ liệu.

---

## 3. Cấu Trúc Thư Mục (Project Structure)

```text
ecommerce-ui/
│
├── index.html                      # Trang chủ & Trưng bày sản phẩm
├── README.md                       # Tài liệu hướng dẫn & Báo cáo đồ án
├── UX_IMPROVEMENTS.md              # Báo cáo phân tích hiện trạng & Cải tiến UX
├── UI_FLOW.md                      # Sơ đồ luồng điều hướng & Quy trình người dùng
│
├── pages/                          # Các trang chức năng của Khách hàng
│   ├── products.html               # Danh mục sản phẩm & Bộ lọc Faceted
│   ├── product-detail.html         # Chi tiết sản phẩm, Thông số & Đánh giá
│   ├── cart.html                   # Quản lý giỏ hàng & Tính toán thành tiền
│   ├── checkout.html               # Đặt hàng, Chọn Voucher & Phương thức thanh toán
│   ├── order-success.html          # Màn hình xác nhận đặt hàng thành công
│   ├── orders.html                 # Lịch sử đơn mua & Phân loại theo trạng thái
│   ├── order-detail.html           # Chi tiết đơn hàng với Stepper tiến trình
│   ├── login.html                  # Đăng nhập (Có sẵn nút bấm tài khoản demo)
│   ├── register.html               # Đăng ký tài khoản & Modal nhập OTP 60s
│   ├── forgot-password.html        # Khôi phục mật khẩu 3 bước wizard
│   └── profile.html                # Hồ sơ cá nhân, Đổi mật khẩu & Sổ địa chỉ
│
├── admin/                          # Các trang Quản trị viên (Admin Portal)
│   ├── dashboard.html              # Bảng điều khiển KPI, Tỷ trọng & Đơn gần đây
│   ├── products.html               # Quản lý kho, Thêm/Sửa/Xóa sản phẩm
│   ├── orders.html                 # Duyệt đơn hàng, Chuyển trạng thái & Hủy đơn
│   ├── vouchers.html               # Quản lý mã giảm giá & Hạn mức áp dụng
│   ├── users.html                  # Quản lý người dùng, Khóa/Mở & Phân quyền
│   └── feedback.html               # Duyệt đánh giá, Lọc số sao & Trả lời bình luận
│
├── css/                            # Hệ thống định kiểu phân lớp (Design System)
│   ├── style.css                   # Biến màu, Typography, Reset & Cơ bản
│   ├── components.css              # Các thành phần tái sử dụng (Card, Button, Modal...)
│   └── responsive.css              # Breakpoints, Tối ưu giao diện Mobile & Tablet
│
├── js/                             # Logic xử lý giao diện & Trạng thái dữ liệu
│   ├── data.js                     # Cơ sở dữ liệu tĩnh (Sản phẩm, Voucher, Đơn hàng, User)
│   ├── app.js                      # Tiện ích chung, Định dạng tiền tệ, Toast & Phiên đăng nhập
│   ├── cart.js                     # Logic giỏ hàng, Checkout & Lưu trữ đơn hàng
│   └── products.js                 # Bộ lọc Faceted, Sắp xếp, Gallery ảnh & Đánh giá
│
└── assets/                         # Thư viện hình ảnh thực tế được kế thừa
    └── images/
        ├── accessories/            # Ảnh phụ kiện (tai nghe, bàn phím, sạc...)
        ├── laptops/                # Ảnh laptop (Dell, Asus, MacBook...)
        ├── phones/                 # Ảnh điện thoại (iPhone, Samsung...)
        ├── slide-login/            # Ảnh banner quảng cáo & slider trang đăng nhập
        └── vouchers/               # Ảnh minh họa thẻ giảm giá
```

---

## 4. Hướng Dẫn Cài Đặt & Khởi Chạy (How to Run)

### Cách 1: Mở Trực Tiếp Bằng Trình Duyệt (Khuyên Dùng Cho Nhanh)
Do toàn bộ đường dẫn trong dự án sử dụng **100% đường dẫn tương đối (Relative Paths)**, bạn chỉ cần:
1. Tải về hoặc clone repository về máy tính.
2. Điều hướng đến thư mục `ecommerce-ui/`.
3. Nhấp đúp chuột (Double click) vào tệp `index.html` để mở ngay trên Chrome, Edge, Safari hoặc Firefox.

### Cách 2: Sử Dụng Extension Live Server (Visual Studio Code)
1. Mở thư mục `ecommerce-ui/` trong Visual Studio Code.
2. Cài đặt tiện ích mở rộng [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
3. Nhấp chuột phải vào `index.html` và chọn **Open with Live Server**.
4. Trình duyệt sẽ tự động mở địa chỉ: `http://127.0.0.1:5500/index.html`.

---

## 5. Hướng Dẫn Triển Khai Lên GitHub Pages

Dự án được tối ưu 100% tương thích với GitHub Pages mà không cần bất kỳ lệnh `build` nào:

1. Đẩy thư mục `ecommerce-ui/` lên repository GitHub của bạn (ví dụ nhánh `main`).
2. Trên giao diện GitHub của repository, chọn tab **Settings** -> mục **Pages** (ở cột bên trái).
3. Tại phần **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`.
   - **Branch**: Chọn nhánh `main` và chọn thư mục chứa `index.html` (chọn `/root` nếu đặt toàn bộ nội dung của `ecommerce-ui/` ở thư mục gốc của repository).
4. Nhấn **Save**. Sau khoảng 1-2 phút, trang web sẽ được kích hoạt tại đường dẫn:  
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 6. Dữ Liệu Mô Phỏng & Tài Khoản Kiểm Thử (Mock Data & Accounts)

Tại trang `pages/login.html`, giao diện đã tích hợp sẵn 2 nút bấm **Tài khoản Demo nhanh**:

### 1. Quyền Khách Hàng (Customer)
- **Tên đăng nhập**: `thanhdat`
- **Mật khẩu**: `Thanhdat@123456`
- **Hành động sau đăng nhập**: Chuyển về Trang chủ với tư cách khách hàng thân thiết, hiển thị giỏ hàng, menu tài khoản, lịch sử đơn mua cá nhân.

### 2. Quyền Quản Trị Viên (Admin)
- **Tên đăng nhập**: `admin`
- **Mật khẩu**: `Admin@123456`
- **Hành động sau đăng nhập**: Chuyển thẳng đến trang **Bảng Điều Khiển Quản Trị** (`admin/dashboard.html`) với đầy đủ quyền quản lý sản phẩm, đơn hàng, mã giảm giá và duyệt phản hồi.

---

## 7. Gợi Ý Cho Đội Ngũ Lập Trình Viên Khi Chuyển Sang Servlet/JSP

| Tệp Prototype Tĩnh | Đích Đến Trong Mã Nguồn Java Web | Ghi Chú Tích Hợp |
| :--- | :--- | :--- |
| `index.html` | `index.jsp` / `HomeController.java` | Thay danh sách sản phẩm bằng thẻ `<c:forEach items="${products}" var="p">` |
| `pages/products.html` | `products.jsp` / `ProductListServlet.java` | Ánh xạ tham số URL `?category=`, `?brand=`, `?sort=` sang `request.getParameter(...)` |
| `pages/product-detail.html` | `product-detail.jsp` / `ProductDetailServlet.java` | Đổ dữ liệu từ `ProductDAO.getProductById(...)` |
| `pages/cart.html` | `cart.jsp` / `CartServlet.java` | Lấy danh sách item từ `session.getAttribute("cart")` |
| `pages/checkout.html` | `checkout.jsp` / `CheckoutServlet.java` | Xử lý `POST` đơn hàng vào cơ sở dữ liệu bảng `Orders` và `OrderDetails` |
| `pages/orders.html` | `orders.jsp` / `OrderHistoryServlet.java` | Lấy danh sách đơn của `session.getAttribute("user")` |
| `admin/dashboard.html` | `dashboard.jsp` / `AdminDashboardServlet.java` | Tính tổng `SUM(total_amount)` và `COUNT(order_id)` từ CSDL |
| `admin/products.html` | `admin-product.jsp` / `AdminProductServlet.java` | Tích hợp các thao tác CRUD sản phẩm |
| `admin/orders.html` | `admin/orders/list.jsp` / `AdminOrderServlet.java` | Cập nhật cột `status` trong CSDL với 4 trạng thái tương ứng |

---

## 8. Giấy Phép & Bản Quyền
- Dự án được xây dựng phục vụ cho mục đích học tập và nghiên cứu đồ án PRJ301 tại FPT University.
- Bản quyền hình ảnh sản phẩm thuộc về các thương hiệu: Apple, Dell, Asus, Samsung, Sony, Logitech.
