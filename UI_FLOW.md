# Sơ Đồ Điều Hướng & Luồng Người Dùng (UI/UX Flow) - TechZone

Tài liệu này mô tả chi tiết cây điều hướng toàn bộ hệ thống (Sitemap), các luồng nghiệp vụ người dùng (User Flows) và sơ đồ tương tác giữa các trang trong bộ Prototype tĩnh TechZone.

---

## 1. Cây Điều Hướng Toàn Hệ Thống (Sitemap & Page Map)

```text
TechZone Static Prototype Root
│
├── index.html (Trang chủ & Khám phá sản phẩm)
│
├── pages/
│   ├── products.html (Danh mục, Tìm kiếm & Bộ lọc Faceted Filter)
│   ├── product-detail.html (Chi tiết sản phẩm, Thông số & Đánh giá)
│   ├── cart.html (Giỏ hàng, Chọn sản phẩm & Tính tiền)
│   ├── checkout.html (Thanh toán, Chọn địa chỉ & Voucher)
│   ├── order-success.html (Xác nhận đặt hàng thành công)
│   ├── orders.html (Lịch sử đơn mua & Phân loại trạng thái)
│   ├── order-detail.html (Chi tiết đơn hàng & Stepper tiến trình)
│   ├── login.html (Đăng nhập & Chuyển đổi tài khoản demo)
│   ├── register.html (Đăng ký tài khoản mới & Mô phỏng mã OTP)
│   ├── forgot-password.html (Khôi phục mật khẩu 3 bước OTP)
│   └── profile.html (Hồ sơ cá nhân, Đổi mật khẩu & Sổ địa chỉ)
│
└── admin/
    ├── dashboard.html (Tổng quan kinh doanh, KPI & Tỷ trọng danh mục)
    ├── products.html (Quản lý kho sản phẩm, Thêm/Sửa/Xóa sản phẩm)
    ├── orders.html (Quản lý đơn hàng, Chuyển trạng thái & Hủy đơn)
    ├── vouchers.html (Quản lý mã giảm giá & Hạn mức áp dụng)
    ├── users.html (Quản trị tài khoản & Phân quyền hệ thống)
    └── feedback.html (Kiểm duyệt đánh giá & Trả lời bình luận khách hàng)
```

---

## 2. Luồng Nghiệp Vụ Khách Hàng (Customer User Flows)

### 2.1. Luồng Khám Phá Sản Phẩm & Mua Hàng (Conversion Funnel)

```mermaid
graph TD
    A[Trang Chủ - index.html] -->|Click Banner / Danh mục / Thẻ SP| B[Danh Sách Sản Phẩm - pages/products.html]
    A -->|Tìm kiếm từ khóa ở Header| B
    B -->|Lọc theo Thương hiệu, Giá, Tồn kho| B
    B -->|Click vào Sản Phẩm| C[Chi Tiết Sản Phẩm - pages/product-detail.html]
    C -->|Chọn Số lượng & Nhấn 'Thêm vào giỏ'| D[Toast Thông Báo & Cập Nhật Badge Giỏ Hàng]
    C -->|Nhấn 'Mua Ngay'| E[Giỏ Hàng - pages/cart.html]
    D -->|Click Biểu Tượng Giỏ Hàng| E
    E -->|Tích chọn sản phẩm & Nhấn 'Tiến hành đặt hàng'| F[Thanh Toán - pages/checkout.html]
    F -->|Nhập địa chỉ, Chọn Voucher, Chọn COD/Bank| F
    F -->|Nhấn 'Đặt Hàng Ngay'| G[Đặt Hàng Thành Công - pages/order-success.html]
    G -->|Nhấn 'Xem chi tiết đơn hàng'| H[Chi Tiết Đơn Hàng - pages/order-detail.html]
    G -->|Nhấn 'Tiếp tục mua sắm'| A
```

### 2.2. Luồng Quản Lý Tài Khoản & Lịch Sử Mua Hàng

```mermaid
graph TD
    User[Khách Hàng] --> Profile[Trang Cá Nhân - pages/profile.html]
    Profile -->|Tab 1: Thông tin cá nhân| EditProfile[Cập nhật Họ tên, SĐT, Địa chỉ]
    Profile -->|Tab 2: Đổi mật khẩu| ChangePass[Cập nhật mật khẩu mới]
    Profile -->|Tab 3: Sổ địa chỉ| AddressBook[Thêm / Chọn địa chỉ giao hàng mặc định]
    Profile -->|Menu Đơn hàng của tôi| OrdersList[Lịch sử đơn hàng - pages/orders.html]
    OrdersList -->|Lọc theo tab: Chờ xác nhận, Đang giao, Hoàn thành, Đã hủy| OrdersList
    OrdersList -->|Click 'Xem chi tiết'| OrderDetail[Chi tiết đơn hàng - pages/order-detail.html]
    OrderDetail -->|Đơn đang PROCESSING| CancelOrder[Nhấn 'Hủy đơn hàng' kèm lý do]
    OrderDetail -->|Đơn COMPLETED| ReOrder[Nhấn 'Mua Lại' -> Thêm vào giỏ hàng]
```

### 2.3. Luồng Xác Thực & Khôi Phục Mật Khẩu

```mermaid
graph TD
    Auth[Trang Đăng Nhập - pages/login.html] -->|Chưa có tài khoản| Reg[Đăng Ký - pages/register.html]
    Reg -->|Nhập thông tin & Submit| OTPModal[Modal Nhập Mã OTP 6 Chữ Số]
    OTPModal -->|Nhập mã 123456 & Xác nhận| RegSuccess[Lưu tài khoản & Chuyển sang Đăng Nhập]
    
    Auth -->|Quên mật khẩu?| Forgot[Quên Mật Khẩu - pages/forgot-password.html]
    Forgot -->|Bước 1: Nhập Email nhận mã| Step2OTP[Bước 2: Nhập OTP đếm ngược 60s]
    Step2OTP -->|Bước 3: Nhập mật khẩu mới| Step3Pass[Cập nhật mật khẩu thành công]
    Step3Pass -->|Nhấn 'Đăng nhập ngay'| Auth
    
    Auth -->|Nút Demo Khách Hàng| LoginCustomer[Đăng nhập vai trò User -> Trang Chủ]
    Auth -->|Nút Demo Admin| LoginAdmin[Đăng nhập vai trò Admin -> Admin Dashboard]
```

---

## 3. Luồng Nghiệp Vụ Quản Trị Viên (Admin Workflows)

### 3.1. Luồng Xử Lý Đơn Hàng & Giao Nhận

```mermaid
graph TD
    Admin[Quản Trị Viên] --> AdminOrders[Quản Lý Đơn Hàng - admin/orders.html]
    AdminOrders -->|Đơn mới đặt: PROCESSING| Action1[Xác nhận đơn & Xuất kho -> Chuyển sang PENDING]
    AdminOrders -->|Đơn đang giao: PENDING| Action2[Xác nhận giao thành công & Thu tiền -> Chuyển sang COMPLETED]
    AdminOrders -->|Đơn có sự cố hoặc khách yêu cầu| Action3[Mở Modal Chọn Lý Do Hủy -> Chuyển sang CANCELED]
    AdminOrders -->|Click 'Chi tiết'| OrderModal[Modal xem chi tiết sản phẩm, địa chỉ & thanh toán]
```

### 3.2. Luồng Quản Lý Tồn Kho & Sản Phẩm

```mermaid
graph TD
    AdminProd[Quản Lý Sản Phẩm - admin/products.html] -->|Lọc theo Tồn kho: Còn hàng / Sắp hết / Hết hàng| AdminProd
    AdminProd -->|Nhấn 'Thêm Sản Phẩm Mới'| AddModal[Modal Thêm SP: Tên, SKU, Danh mục, Giá, Tồn kho, Ảnh]
    AdminProd -->|Nhấn Icon Sửa| EditModal[Modal Cập nhật thông tin & Số lượng kho]
    AdminProd -->|Nhấn Icon Xóa| DeleteModal[Modal Xác nhận xóa sản phẩm]
```

### 3.3. Luồng Quản Lý Khuyến Mãi (Vouchers)

```mermaid
graph TD
    AdminVoucher[Quản Lý Voucher - admin/vouchers.html] -->|Tạo Voucher Mới| VoucherModal[Nhập Mã Code, Loại giảm: % hoặc Tiền mặt, Đơn tối thiểu, Hạn dùng]
    VoucherModal -->|Lưu Voucher| VoucherList[Voucher xuất hiện ngay tại trang Checkout của khách hàng]
    AdminVoucher -->|Xóa Voucher| DelVoucher[Ngừng áp dụng mã giảm giá]
```

### 3.4. Luồng Kiểm Duyệt Đánh Giá (Feedback Moderation)

```mermaid
graph TD
    AdminFeedback[Quản Lý Đánh Giá - admin/feedback.html] -->|Lọc theo số sao 1-5 sao| AdminFeedback
    AdminFeedback -->|Nhấn Trả Lời| ReplyModal[Nhập nội dung phản hồi chính thức từ TechZone]
    AdminFeedback -->|Nhấn Ẩn/Hiện| ToggleVis[Duyệt hoặc tạm ẩn bình luận không phù hợp]
```

---

## 4. Nguyên Tắc Điều Hướng Tương Đối (Relative Paths)

Tất cả các liên kết trong toàn bộ prototype đều tuân thủ 100% đường dẫn tương đối (Relative Paths) để đảm bảo có thể chạy trực tiếp trên:
- **Tập tin cục bộ (File System)**: Mở trực tiếp `index.html` bằng trình duyệt.
- **Visual Studio Code Live Server**: `http://127.0.0.1:5500/index.html`.
- **GitHub Pages**: `https://<username>.github.io/<repo-name>/index.html`.

### Bảng Quy Ước Đường Dẫn:

| Vị trí file nguồn | Đích đến | Cú pháp đường dẫn |
| :--- | :--- | :--- |
| `index.html` | Trang con trong `pages/` | `pages/products.html`, `pages/cart.html` |
| `index.html` | Trang quản trị `admin/` | `admin/dashboard.html` |
| `index.html` | Tài nguyên CSS/JS/Images | `css/style.css`, `js/data.js`, `assets/images/...` |
| `pages/*.html` | Về Trang chủ | `../index.html` |
| `pages/*.html` | Sang trang con khác cùng thư mục | `cart.html`, `checkout.html`, `login.html` |
| `pages/*.html` | Sang trang quản trị `admin/` | `../admin/dashboard.html` |
| `pages/*.html` | Tài nguyên CSS/JS/Images | `../css/style.css`, `../js/data.js`, `../assets/images/...` |
| `admin/*.html` | Về Cửa hàng (Trang chủ) | `../index.html` |
| `admin/*.html` | Sang trang quản trị khác | `products.html`, `orders.html`, `vouchers.html` |
| `admin/*.html` | Tài nguyên CSS/JS/Images | `../css/style.css`, `../js/data.js`, `../assets/images/...` |
