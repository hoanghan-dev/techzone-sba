# Báo Cáo Cải Tiến UI/UX - TechZone Prototype

Tài liệu này tổng hợp toàn bộ các phân tích đánh giá hiện trạng giao diện JSP/Servlet cũ của dự án **TechZone**, các quyết định tái thiết kế UI/UX hiện đại, lý do cải tiến và vị trí hiện thực cụ thể trong bộ prototype tĩnh.

---

## 1. Tổng Quan Về Kiến Trúc Giao Diện & Vấn Đề Cốt Lõi

| Vấn đề trên JSP/Servlet cũ | Tác động tiêu cực đến trải nghiệm | Giải pháp trên Prototype Hiện Đại |
| :--- | :--- | :--- |
| **CSS inline cứng & dịch chuyển tọa độ** (ví dụ `transform: translateX(-150px)`, `margin-left: 280px`) | Giao diện bị vỡ nát khi đổi kích thước màn hình hoặc mở trên thiết bị di động/tablet | Chuyển đổi 100% sang CSS Grid/Flexbox và hệ thống lưới chuẩn Bootstrap 5 responsive |
| **Thiếu phân cấp thị giác (Visual Hierarchy)** | Người dùng khó nhận biết tên sản phẩm, giá bán thực tế, giá gốc và ưu đãi | Thiết kế Typography rõ ràng với font Inter, giá tiền định dạng VNĐ nổi bật, badge giảm giá bắt mắt |
| **Bộ lọc sản phẩm tải lại toàn trang** | Gây giật lag, mất vị trí cuộn trang, tạo cảm giác nặng nề | Bộ lọc Faceted Filter client-side tức thì (danh mục, thương hiệu, khoảng giá, tình trạng kho) |
| **Quy trình Thanh toán (Checkout) phân mảnh** | Người dùng bối rối khi nhập địa chỉ, áp voucher không có phản hồi tức thì | Giao diện Checkout trực quan với danh sách voucher chọn nhanh, tính toán tự động và timeline trạng thái |
| **Trải nghiệm di động (Mobile) nghèo nàn** | Bảng dữ liệu tràn màn hình, nút bấm quá nhỏ khó chạm bằng ngón tay | Thiết kế Mobile-first với offcanvas drawer, bottom floating bar, touch target tối thiểu 44px |

---

## 2. Chi Tiết Cải Tiến Từng Trang & Thành Phần

### 2.1. Trang Chủ (`index.html`)

#### Vấn Đề Cũ:
- Banner quảng cáo tĩnh, không có CTA (Call To Action) hướng dẫn người dùng mua sắm.
- Danh mục sản phẩm chỉ là văn bản đơn điệu, không có hình ảnh đại diện trực quan.
- Không có các khu vực kích thích chuyển đổi như "Sản phẩm bán chạy", "Ưu đãi hot", "Gợi ý cho bạn".

#### Quyết Định Thiết Kế (UX Decision):
- Bổ sung **Hero Carousel** với hình ảnh thực tế chất lượng cao, thông điệp rõ ràng và nút "Khám Phá Ngay" dẫn thẳng vào danh mục tương ứng.
- Thiết kế **Category Cards** dạng lưới trực quan với icon và hình đại diện cho 3 danh mục chính: *Laptops, Smartphones, Phụ Kiện*.
- Thêm dải **Cam Kết Thương Hiệu** (Giao hàng 2h, 100% Chính hãng, Đổi trả 30 ngày, Hỗ trợ kỹ thuật 24/7).
- Phân tách 3 tab sản phẩm: **Sản Phẩm Mới Nhất**, **Bán Chạy Nhất**, và **Đang Giảm Giá Sốc**.

#### Lý Do:
- Tăng tỷ lệ giữ chân khách hàng (dwell time) ngay từ 3 giây đầu tiên truy cập.
- Người dùng có thể nhanh chóng bắt đầu hành trình tìm kiếm theo đúng nhu cầu hoặc nhóm sản phẩm quan tâm.

#### Hiện Thực:
- `index.html`
- `css/components.css` (`.hero-carousel`, `.category-card`, `.feature-box`)

---

### 2.2. Trang Danh Mục & Bộ Lọc (`pages/products.html`)

#### Vấn Đề Cũ:
- Bộ lọc danh mục bị cố định cứng, không thể kết hợp nhiều tiêu chí (ví dụ: vừa chọn Laptop Dell vừa chọn khoảng giá từ 20 đến 40 triệu).
- Mỗi lần chọn danh mục là trình duyệt gửi request GET tải lại toàn bộ JSP.
- Không có hiển thị các tag bộ lọc đang kích hoạt (Active Filter Tags) để người dùng xóa nhanh.

#### Quyết Định Thiết Kế (UX Decision):
- Xây dựng **Faceted Filter Sidebar**:
  - Lọc theo Danh mục (Laptops, Smartphones, Phụ Kiện).
  - Lọc theo Thương hiệu (Apple, Dell, Asus, Samsung, Sony, Logitech, Anker).
  - Lọc theo Khoảng giá (Dưới 5 triệu, 5-15 triệu, 15-30 triệu, Trên 30 triệu).
  - Lọc theo Tình trạng tồn kho (Chỉ hiện sản phẩm còn hàng).
- Thêm **Thanh công cụ phân loại (Sorting toolbar)**: Mới nhất, Giá tăng dần, Giá giảm dần, Đánh giá cao nhất.
- Hỗ trợ **Active Filter Badges**: hiển thị chip tag những tiêu chí đang lọc với nút (x) để bỏ chọn từng mục hoặc nút "Xóa tất cả bộ lọc".
- Trên màn hình di động: Tự động chuyển sidebar thành **Offcanvas Filter Drawer** tiện dụng.

#### Lý Do:
- Người dùng tìm kiếm sản phẩm nhanh hơn gấp 3 lần, giảm tỷ lệ thoát trang do không tìm thấy cấu hình mong muốn.

#### Hiện Thực:
- `pages/products.html`
- `js/products.js` (`filterProducts()`, `renderActiveFilters()`)
- `css/components.css` (`.filter-sidebar`, `.filter-chip`)

---

### 2.3. Trang Chi Tiết Sản Phẩm (`pages/product-detail.html`)

#### Vấn Đề Cũ:
- Chỉ có 1 hình ảnh sản phẩm tĩnh, kích thước nhỏ và không xem được nhiều góc độ.
- Thông số kỹ thuật hiển thị dưới dạng văn bản thô, khó so sánh cấu hình (RAM, CPU, Ổ cứng, Pin).
- Nút "Thêm vào giỏ hàng" không có phản hồi thị giác, người dùng không biết đã thêm thành công hay chưa.
- Phần bình luận/đánh giá không kiểm tra người mua hàng thực tế (Verified Buyer).

#### Quyết Định Thiết Kế (UX Decision):
- **Thư viện ảnh tương tác (Interactive Gallery)**: Ảnh chính kích thước lớn kèm thumbnails phụ bên dưới; click thumbnail tự động chuyển ảnh mượt mà.
- **Bảng thông số kỹ thuật dạng bảng sọc (Striped Specs Table)** phân định rõ từng phần cứng: CPU, RAM, Ổ cứng, Màn hình, Trọng lượng.
- **Bộ đếm số lượng thông minh (Quantity Stepper)**: Ngăn chặn nhập số lượng vượt quá lượng tồn kho thực tế trong kho hàng.
- **Nút Mua Ngay & Thêm Vào Giỏ**: Đặt cạnh nhau với phân cấp màu sắc rõ rệt (Primary vs Outline Primary) kèm hiệu ứng Toast thông báo tức thì.
- **Hệ thống đánh giá sản phẩm có gắn huy hiệu "Đã mua hàng tại TechZone"**: Form gửi đánh giá chọn số sao và gửi bình luận trực tiếp.

#### Lý Do:
- Giúp khách hàng nắm bắt đầy đủ thông số sản phẩm trước khi ra quyết định chi tiền, giảm thiểu tỷ lệ hoàn trả hàng do sai lệch kỳ vọng.

#### Hiện Thực:
- `pages/product-detail.html`
- `js/products.js` (`switchMainImage()`, `changeDetailQty()`, `submitReview()`)
- `css/components.css` (`.product-gallery`, `.specs-table`)

---

### 2.4. Giỏ Hàng (`pages/cart.html`)

#### Vấn Đề Cũ:
- Giỏ hàng bảng HTML cổ điển, không thể chọn từng món hàng để thanh toán (phải mua toàn bộ giỏ).
- Cập nhật số lượng bằng cách nhập vào input rồi bấm nút "Cập nhật giỏ hàng" tải lại trang.
- Không có trạng thái Giỏ hàng trống (Empty Cart) với nút kêu gọi tiếp tục mua sắm.

#### Quyết Định Thiết Kế (UX Decision):
- **Cơ chế Chọn từng sản phẩm (Select Checkboxes)**: Có checkbox "Chọn tất cả" và checkbox cho từng món. Chỉ những món được tích chọn mới được tính vào Tổng tiền thanh toán.
- **Stepper Tăng/Giảm (+ / -) thời gian thực**: Cập nhật tức thì số lượng, thành tiền và lưu vào `localStorage`.
- **Card Tổng Kết Đơn Hàng Cố Định (Sticky Order Summary)**: Hiển thị minh bạch Tạm tính, Tiết kiệm, và nút CTA "Tiến Hành Đặt Hàng" nổi bật.
- **Empty Cart State thân thiện**: Biểu tượng giỏ hàng rỗng, thông điệp nhắc nhở và nút "Khám Phá Sản Phẩm Ngay".

#### Lý Do:
- Tăng tính linh hoạt và chủ động cho người mua (khách hàng có thể lưu sẵn nhiều món trong giỏ và chọn mua từng đợt).

#### Hiện Thực:
- `pages/cart.html`
- `js/cart.js` (`updateCartQuantity()`, `toggleCartItemSelection()`, `removeCartItem()`)

---

### 2.5. Thanh Toán (`pages/checkout.html`)

#### Vấn Đề Cũ:
- Form nhập địa chỉ lộn xộn, thiếu xác thực định dạng số điện thoại.
- Không thể chọn mã voucher giảm giá nếu không nhớ chính xác từng ký tự mã code.
- Phí vận chuyển không rõ ràng (hệ thống có phí cố định 150.000₫ nhưng không giải thích cụ thể cho khách).
- Không có tóm tắt sản phẩm đang thanh toán ngay tại trang checkout.

#### Quyết Định Thiết Kế (UX Decision):
- **Bố cục 2 cột chuyên nghiệp**: Cột trái là thông tin giao nhận & phương thức thanh toán; Cột phải là tóm tắt đơn hàng và danh sách sản phẩm.
- **Module Mã Giảm Giá Trực Quan**:
  - Ô nhập mã kèm nút "Áp dụng".
  - Danh sách voucher khả dụng hiển thị sẵn bên dưới (mức giảm, điều kiện đơn tối thiểu) với nút "Áp dụng ngay" 1-click.
  - Phản hồi trực quan: Hiển thị dòng "Giảm giá voucher" màu xanh lá với số tiền trừ rõ ràng.
- **Phương thức thanh toán trực quan**: Lựa chọn giữa COD (Thanh toán khi nhận hàng) và Chuyển khoản ngân hàng (kèm thông tin tài khoản và mã QR mô phỏng).
- **Thông báo phí vận chuyển minh bạch**: Hiển thị rõ phí giao hàng tiêu chuẩn toàn quốc (150.000₫) theo đúng quy tắc nghiệp vụ của hệ thống gốc.

#### Lý Do:
- Giảm thiểu tỷ lệ bỏ giỏ hàng (Cart Abandonment Rate) ở bước cuối cùng trước khi đặt hàng.

#### Hiện Thực:
- `pages/checkout.html`
- `js/cart.js` (`applyVoucher()`, `handleCheckoutSubmit()`)

---

### 2.6. Theo Dõi & Chi Tiết Đơn Hàng (`pages/orders.html` & `pages/order-detail.html`)

#### Vấn Đề Cũ:
- Đơn hàng chỉ được liệt kê trong một danh sách thô, không có phân loại theo tiến trình.
- Chi tiết đơn hàng không có tiến trình trực quan, khách hàng không biết đơn hàng đang ở bước nào trong 4 trạng thái (`PROCESSING` -> `PENDING` -> `COMPLETED` / `CANCELED`).
- Khách hàng không thể tự yêu cầu hủy đơn khi đơn vẫn đang ở trạng thái `PROCESSING`.

#### Quyết Định Thiết Kế (UX Decision):
- **Phân loại Tab Đơn Hàng**: Tất cả, Chờ xác nhận, Chờ giao hàng, Đã giao, Đã hủy.
- **Visual Order Stepper 4 bước**: Đặt hàng thành công -> Đã xác nhận -> Đang vận chuyển -> Giao hàng thành công.
- **Hỗ trợ thao tác Hủy Đơn Hàng**: Khách hàng có thể nhấn "Hủy Đơn Hàng" với modal xác nhận nếu đơn chưa xuất kho.
- **Nút "Mua Lại" (Re-order)**: 1-click thêm lại toàn bộ sản phẩm của đơn hàng cũ vào giỏ hàng.

#### Lý Do:
- Giảm áp lực cho bộ phận chăm sóc khách hàng và tổng đài giải đáp thắc mắc về tình trạng bưu kiện.

#### Hiện Thực:
- `pages/orders.html`, `pages/order-detail.html`
- `css/components.css` (`.order-stepper`, `.step-item`)

---

### 2.7. Xác Thực & Phục Hồi Mật Khẩu (`login.html`, `register.html`, `forgot-password.html`)

#### Vấn Đề Cũ:
- Form đăng nhập và đăng ký cũ đơn điệu, không có hình ảnh thương hiệu.
- Quy trình nhập mã OTP xác thực email (`verify-register.jsp`, `verify-otp.jsp`) rời rạc thành từng trang riêng biệt, không có đếm ngược thời gian (countdown timer).
- Người dùng không có cách chuyển đổi tài khoản demo nhanh để kiểm thử giao diện.

#### Quyết Định Thiết Kế (UX Decision):
- **Bố cục Split-screen Card hiện đại**: Một bên là banner slider giới thiệu các ưu đãi đặc quyền TechZone, một bên là form nhập liệu tinh tế.
- **Quick Demo Account Switcher**: Hai nút "Khách Hàng (thanhdat)" và "Quản Trị Viên (admin)" điền sẵn thông tin đăng nhập phục vụ hội đồng nghiệm thu / kiểm thử.
- **OTP Verification Flow với bộ đếm 60s**: Ô nhập 6 chữ số tự động nhảy con trỏ chuột sang ô tiếp theo và nút gửi lại mã kích hoạt sau khi đếm ngược kết thúc.
- **Forgot Password 3-Step Wizard**: Quy trình 3 bước trực quan (Nhập Email -> Nhập OTP -> Đặt mật khẩu mới) gói gọn trong 1 trang duy nhất không cần reload.

#### Lý Do:
- Tối ưu hóa trải nghiệm đăng nhập/đăng ký, tạo ấn tượng ban đầu chuyên nghiệp và an toàn.

#### Hiện Thực:
- `pages/login.html`, `pages/register.html`, `pages/forgot-password.html`

---

### 2.8. Cổng Quản Trị Viên (`admin/`)

#### Vấn Đề Cũ:
- Giao diện admin cũ phong cách thô sơ, thanh sidebar khó dùng, không có bảng thống kê trực quan.
- Không có biểu đồ doanh thu theo danh mục sản phẩm.
- Quản lý đơn hàng không có nút chuyển trạng thái nhanh (`PROCESSING` -> `PENDING` -> `COMPLETED`).
- Không có form trả lời đánh giá của khách hàng từ phía Admin.

#### Quyết Định Thiết Kế (UX Decision):
- **Admin Dashboard Hiện Đại**:
  - 4 thẻ KPI theo chuẩn quốc tế: Doanh thu, Đơn hàng, Tồn kho, Khách hàng mới.
  - Thanh đo tỷ trọng doanh thu giữa 3 danh mục (Laptops, Smartphones, Phụ Kiện).
  - Tình trạng đơn hàng với mã màu trực quan.
- **Quản lý Sản Phẩm (`admin/products.html`)**: Bộ lọc kho (Còn hàng / Sắp hết / Hết hàng), Modal thêm/sửa sản phẩm đầy đủ trường dữ liệu.
- **Quản lý Đơn Hàng (`admin/orders.html`)**: Bảng duyệt đơn với menu chuyển trạng thái tức thì và modal ghi nhận lý do hủy đơn.
- **Quản lý Voucher (`admin/vouchers.html`)**: Tạo voucher theo % hoặc số tiền cố định, thiết lập hạn sử dụng và hạn mức.
- **Quản trị Người Dùng (`admin/users.html`)**: Bật/tắt trạng thái hoạt động (Active/Blocked) và phân quyền Quản trị viên/Khách hàng.
- **Duyệt Đánh Giá (`admin/feedback.html`)**: Lọc theo số sao, duyệt/ẩn đánh giá và gửi câu trả lời chính thức từ TechZone.

#### Lý Do:
- Cung cấp cho đội ngũ vận hành và giảng viên một cái nhìn toàn diện, trực quan về toàn bộ hệ sinh thái phần mềm e-commerce.

#### Hiện Thực:
- `admin/dashboard.html`
- `admin/products.html`
- `admin/orders.html`
- `admin/vouchers.html`
- `admin/users.html`
- `admin/feedback.html`
