/**
 * TechZone Modern E-Commerce - Realistic Mock Database
 * Preserving all business concepts, categories, attributes, and roles.
 */

const CATEGORIES = [
  {
    id: 1,
    name: "Laptops",
    slug: "laptop",
    description: "Laptop gaming, đồ họa và văn phòng cao cấp",
    image: "assets/images/laptops/acer_01.jpg",
    brands: ["MSI", "TUF", "ACER", "LEGION"],
    count: 8
  },
  {
    id: 2,
    name: "Smartphones & Tablets",
    slug: "phone",
    description: "Điện thoại thông minh đỉnh cao công nghệ",
    image: "assets/images/phones/iphone_01.jpg",
    brands: ["SAMSUNG", "IPHONE", "OPPO"],
    count: 9
  },
  {
    id: 3,
    name: "Accessories",
    slug: "accessory",
    description: "Phụ kiện âm thanh, sạc nhanh và lưu trữ",
    image: "assets/images/accessories/anker_charger_04.jpg",
    brands: ["WD", "SONY", "LOGITECH", "ANKER", "SEAGATE", "BASEUS"],
    count: 10
  }
];

const PRODUCTS = [
  // --- LAPTOPS (CategoryID: 1) ---
  {
    id: 1,
    name: "Acer Predator Helios 16 PH16-71-72YG",
    categoryId: 1,
    categoryName: "Laptops",
    categorySlug: "laptop",
    brand: "ACER",
    price: 45990000,
    originalPrice: 49990000,
    discountPercent: 8,
    stock: 15,
    soldCount: 42,
    rating: 4.9,
    reviewCount: 28,
    badge: "Hot Sale",
    image: "assets/images/laptops/acer_01.jpg",
    gallery: [
      "assets/images/laptops/acer_01.jpg",
      "assets/images/laptops/acer_02.jpg",
      "assets/images/laptops/acer_03.jpg"
    ],
    description: "Predator Helios 16 trang bị bộ xử lý Intel Core i7-13700HX và card đồ họa NVIDIA GeForce RTX 4070 mang lại hiệu năng gaming đỉnh cao vượt trội.",
    specs: {
      cpu: "Intel Core i7-13700HX (Up to 5.0GHz, 16C/24T)",
      ram: "16GB DDR5 4800MHz (2x8GB)",
      storage: "512GB PCIe NVMe SSD",
      gpu: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      display: '16.0" WQXGA (2560x1600) 240Hz 100% sRGB',
      os: "Windows 11 Home",
      weight: "2.6 kg",
      battery: "90 Whr"
    }
  },
  {
    id: 2,
    name: "Lenovo Legion 5 Pro 16ARH7H",
    categoryId: 1,
    categoryName: "Laptops",
    categorySlug: "laptop",
    brand: "LEGION",
    price: 38490000,
    originalPrice: 42990000,
    discountPercent: 10,
    stock: 12,
    soldCount: 68,
    rating: 4.8,
    reviewCount: 35,
    badge: "Best Seller",
    image: "assets/images/laptops/legion_01.jpg",
    gallery: [
      "assets/images/laptops/legion_01.jpg",
      "assets/images/laptops/legion_02.jpg",
      "assets/images/laptops/legion_03.jpg"
    ],
    description: "Sức mạnh chiến game ấn tượng cùng màn hình WQXGA tỉ lệ 16:10 165Hz chuẩn màu sắc chuyên nghiệp.",
    specs: {
      cpu: "AMD Ryzen 7 6800H (Up to 4.7GHz, 8C/16T)",
      ram: "16GB DDR5 4800MHz",
      storage: "1TB SSD M.2 PCIe Gen 4",
      gpu: "NVIDIA GeForce RTX 3070 Ti 8GB GDDR6 (150W)",
      display: '16.0" 2.5K (2560x1600) IPS 165Hz 500nits 100% sRGB',
      os: "Windows 11 Home",
      weight: "2.49 kg",
      battery: "80 Whr"
    }
  },
  {
    id: 3,
    name: "MSI Katana GF66 12UCK-804VN",
    categoryId: 1,
    categoryName: "Laptops",
    categorySlug: "laptop",
    brand: "MSI",
    price: 18990000,
    originalPrice: 21490000,
    discountPercent: 12,
    stock: 20,
    soldCount: 89,
    rating: 4.7,
    reviewCount: 45,
    badge: "Giảm Sốc",
    image: "assets/images/laptops/msi_01.jpg",
    gallery: [
      "assets/images/laptops/msi_01.jpg",
      "assets/images/laptops/msi_02.jpg",
      "assets/images/laptops/msi_03.jpg"
    ],
    description: "Laptop gaming quốc dân với thiết kế thanh lịch, bàn phím LED đỏ rực lửa và hiệu năng mượt mà cho mọi tựa game Esport.",
    specs: {
      cpu: "Intel Core i5-12450H",
      ram: "8GB DDR4 3200MHz",
      storage: "512GB NVMe PCIe Gen4 SSD",
      gpu: "NVIDIA GeForce RTX 3050 4GB GDDR6",
      display: '15.6" FHD (1920x1080) 144Hz IPS',
      os: "Windows 11 Home",
      weight: "2.25 kg",
      battery: "53.5 Whr"
    }
  },
  {
    id: 4,
    name: "ASUS TUF Gaming F15 FX507ZC4",
    categoryId: 1,
    categoryName: "Laptops",
    categorySlug: "laptop",
    brand: "TUF",
    price: 19490000,
    originalPrice: 22990000,
    discountPercent: 15,
    stock: 0,
    soldCount: 110,
    rating: 4.8,
    reviewCount: 52,
    badge: "Hết hàng",
    image: "assets/images/laptops/tuf_01.jpg",
    gallery: [
      "assets/images/laptops/tuf_01.jpg",
      "assets/images/laptops/tuf_02.jpg",
      "assets/images/laptops/tuf_03.jpg"
    ],
    description: "Độ bền chuẩn quân đội MIL-STD-810H kết hợp hệ thống tản nhiệt Arc Flow Fans 84 cánh cho khả năng vận hành mát mẻ.",
    specs: {
      cpu: "Intel Core i5-12500H",
      ram: "16GB DDR4 3200MHz",
      storage: "512GB PCIe 3.0 NVMe M.2 SSD",
      gpu: "NVIDIA GeForce RTX 3050 4GB",
      display: '15.6" FHD (1920x1080) 144Hz IPS Adaptive-Sync',
      os: "Windows 11 Home",
      weight: "2.2 kg",
      battery: "56 Whr"
    }
  },
  {
    id: 5,
    name: "Acer Nitro 5 Tiger AN515-58-769J",
    categoryId: 1,
    categoryName: "Laptops",
    categorySlug: "laptop",
    brand: "ACER",
    price: 24990000,
    originalPrice: 27990000,
    discountPercent: 11,
    stock: 18,
    soldCount: 75,
    rating: 4.7,
    reviewCount: 39,
    badge: "Bán chạy",
    image: "assets/images/laptops/acer_04.jpg",
    gallery: [
      "assets/images/laptops/acer_04.jpg",
      "assets/images/laptops/acer_05.jpg"
    ],
    description: "Thiết kế hầm hố đậm chất chiến binh cùng công nghệ Acer CoolBoost giúp tăng 10% tốc độ quạt và làm mát CPU/GPU.",
    specs: {
      cpu: "Intel Core i7-12700H",
      ram: "16GB DDR4 3200MHz",
      storage: "512GB PCIe NVMe SSD",
      gpu: "NVIDIA GeForce RTX 3050 Ti 4GB",
      display: '15.6" FHD 144Hz SlimBezel',
      os: "Windows 11 Home",
      weight: "2.5 kg",
      battery: "57.5 Whr"
    }
  },

  // --- SMARTPHONES (CategoryID: 2) ---
  {
    id: 6,
    name: "iPhone 15 Pro Max 256GB Titan Tự Nhiên",
    categoryId: 2,
    categoryName: "Smartphones & Tablets",
    categorySlug: "phone",
    brand: "IPHONE",
    price: 29490000,
    originalPrice: 34990000,
    discountPercent: 16,
    stock: 25,
    soldCount: 310,
    rating: 4.9,
    reviewCount: 142,
    badge: "Top 1 Trending",
    image: "assets/images/phones/iphone_01.jpg",
    gallery: [
      "assets/images/phones/iphone_01.jpg",
      "assets/images/phones/iphone_02.jpg",
      "assets/images/phones/iphone_03.jpg"
    ],
    description: "Khung viền Titan chuẩn hàng không vũ trụ siêu nhẹ và bền. Chip A17 Pro đem đến sức mạnh đồ họa đỉnh cao với Ray Tracing phần cứng.",
    specs: {
      screen: '6.7" Super Retina XDR OLED 120Hz ProMotion',
      cpu: "Apple A17 Pro 6 nhân",
      ram: "8GB",
      storage: "256GB",
      cam: "Chính 48MP, Phụ 12MP, 12MP (Zoom quang 5x)",
      battery: "4422 mAh, Sạc nhanh 20W, MagSafe 15W",
      os: "iOS 17",
      weight: "221 g"
    }
  },
  {
    id: 7,
    name: "Samsung Galaxy S24 Ultra 5G 12GB/256GB",
    categoryId: 2,
    categoryName: "Smartphones & Tablets",
    categorySlug: "phone",
    brand: "SAMSUNG",
    price: 27990000,
    originalPrice: 31990000,
    discountPercent: 12,
    stock: 14,
    soldCount: 180,
    rating: 4.8,
    reviewCount: 96,
    badge: "Galaxy AI",
    image: "assets/images/phones/samsung_01.jpg",
    gallery: [
      "assets/images/phones/samsung_01.jpg",
      "assets/images/phones/samsung_02.jpg",
      "assets/images/phones/samsung_03.jpg"
    ],
    description: "Quyền năng Galaxy AI dẫn đầu xu hướng công nghệ tương lai. Màn hình phẳng Dynamic AMOLED 2X với kính Corning Gorilla Armor chống chói.",
    specs: {
      screen: '6.8" Dynamic AMOLED 2X Quad HD+ 120Hz',
      cpu: "Snapdragon 8 Gen 3 for Galaxy",
      ram: "12GB",
      storage: "256GB",
      cam: "Chính 200MP & Phụ 50MP, 12MP, 10MP",
      battery: "5000 mAh, Sạc nhanh 45W",
      os: "Android 14 (One UI 6.1)",
      weight: "232 g"
    }
  },
  {
    id: 8,
    name: "OPPO Find N3 Flip 5G",
    categoryId: 2,
    categoryName: "Smartphones & Tablets",
    categorySlug: "phone",
    brand: "OPPO",
    price: 19990000,
    originalPrice: 22990000,
    discountPercent: 13,
    stock: 9,
    soldCount: 45,
    rating: 4.7,
    reviewCount: 22,
    badge: "Gập Độc Đáo",
    image: "assets/images/phones/oppo_01.jpg",
    gallery: [
      "assets/images/phones/oppo_01.jpg",
      "assets/images/phones/oppo_02.jpg",
      "assets/images/phones/oppo_03.jpg"
    ],
    description: "Điện thoại gập tiên phong trang bị 3 camera sau đẳng cấp cùng màn hình ngoài trực quan tiện lợi.",
    specs: {
      screen: 'Chính 6.8" & Phụ 3.26" AMOLED 120Hz',
      cpu: "MediaTek Dimensity 9200 5G",
      ram: "12GB",
      storage: "256GB",
      cam: "Chính 50MP, Góc siêu rộng 48MP, Tele 32MP Hasselblad",
      battery: "4300 mAh, Sạc siêu nhanh SUPERVOOC 44W",
      os: "ColorOS 13.2",
      weight: "198 g"
    }
  },
  {
    id: 9,
    name: "iPhone 14 128GB Midnight",
    categoryId: 2,
    categoryName: "Smartphones & Tablets",
    categorySlug: "phone",
    brand: "IPHONE",
    price: 16990000,
    originalPrice: 19990000,
    discountPercent: 15,
    stock: 30,
    soldCount: 220,
    rating: 4.8,
    reviewCount: 110,
    badge: "Giá Cực Tốt",
    image: "assets/images/phones/iphone_04.jpg",
    gallery: [
      "assets/images/phones/iphone_04.jpg",
      "assets/images/phones/iphone_05.jpg"
    ],
    description: "Hệ thống camera kép ấn tượng, thời lượng pin cả ngày dài và tính năng phát hiện va chạm an toàn.",
    specs: {
      screen: '6.1" Super Retina XDR OLED',
      cpu: "Apple A15 Bionic 5 nhân GPU",
      ram: "6GB",
      storage: "128GB",
      cam: "Kép 12MP",
      battery: "3279 mAh",
      os: "iOS 16 (Up to iOS 17)",
      weight: "172 g"
    }
  },

  // --- ACCESSORIES (CategoryID: 3) ---
  {
    id: 10,
    name: "Củ sạc nhanh Anker 735 GaNPrime 65W A2668",
    categoryId: 3,
    categoryName: "Accessories",
    categorySlug: "accessory",
    brand: "ANKER",
    price: 1190000,
    originalPrice: 1450000,
    discountPercent: 18,
    stock: 50,
    soldCount: 430,
    rating: 4.9,
    reviewCount: 188,
    badge: "Best Seller",
    image: "assets/images/accessories/anker_charger_04.jpg",
    gallery: [
      "assets/images/accessories/anker_charger_04.jpg",
      "assets/images/accessories/anker_charger_02.jpg",
      "assets/images/accessories/anker_charger_06.jpg"
    ],
    description: "Công nghệ GaNPrime độc quyền sạc nhanh 3 thiết bị cùng lúc với công suất tối đa 65W cho laptop, điện thoại và tai nghe.",
    specs: {
      type: "Củ sạc GaN 3 cổng (2 USB-C, 1 USB-A)",
      connectivity: "Power Delivery 3.0, PowerIQ 4.0",
      color: "Đen xám kim loại",
      compatibility: "iPhone, iPad, MacBook, Laptop Windows, Samsung",
      weight: "132 g"
    }
  },
  {
    id: 11,
    name: "Tai nghe chống ồn Sony WH-1000XM5",
    categoryId: 3,
    categoryName: "Accessories",
    categorySlug: "accessory",
    brand: "SONY",
    price: 7490000,
    originalPrice: 8490000,
    discountPercent: 12,
    stock: 16,
    soldCount: 88,
    rating: 4.9,
    reviewCount: 65,
    badge: "Hi-Res Audio",
    image: "assets/images/accessories/sony_headset_01.jpg",
    gallery: [
      "assets/images/accessories/sony_headset_01.jpg",
      "assets/images/accessories/sony_headset_03.jpg",
      "assets/images/accessories/sony_headset_05.jpg"
    ],
    description: "Bộ xử lý chống ồn V1 & QN1 đỉnh cao thế giới, thời lượng pin 30 giờ và chất âm tuyệt hảo chuẩn phòng thu.",
    specs: {
      type: "Over-ear không dây",
      connectivity: "Bluetooth 5.2, Jack 3.5mm, LDAC",
      color: "Đen",
      compatibility: "Android, iOS, Windows, macOS",
      weight: "250 g"
    }
  },
  {
    id: 12,
    name: "Tai nghe Gaming Logitech G Pro X Wireless Lightspeed",
    categoryId: 3,
    categoryName: "Accessories",
    categorySlug: "accessory",
    brand: "LOGITECH",
    price: 3890000,
    originalPrice: 4590000,
    discountPercent: 15,
    stock: 22,
    soldCount: 140,
    rating: 4.8,
    reviewCount: 78,
    badge: "Pro Gaming",
    image: "assets/images/accessories/logitech_headset_02.jpg",
    gallery: [
      "assets/images/accessories/logitech_headset_02.jpg",
      "assets/images/accessories/logitech_headset_04.jpg"
    ],
    description: "Được thiết kế cùng các vận động viên thể thao điện tử hàng đầu với công nghệ âm thanh vòm 7.1 DTS Headphone:X 2.0.",
    specs: {
      type: "Tai nghe gaming không dây",
      connectivity: "LIGHTSPEED 2.4GHz không độ trễ",
      color: "Đen thép",
      compatibility: "PC, PlayStation, Nintendo Switch",
      weight: "370 g"
    }
  },
  {
    id: 13,
    name: "Ổ cứng di động WD My Passport 2TB USB 3.2",
    categoryId: 3,
    categoryName: "Accessories",
    categorySlug: "accessory",
    brand: "WD",
    price: 2150000,
    originalPrice: 2500000,
    discountPercent: 14,
    stock: 35,
    soldCount: 195,
    rating: 4.8,
    reviewCount: 84,
    badge: "Bảo mật 256-bit",
    image: "assets/images/accessories/wd_external_hdd_02.jpg",
    gallery: [
      "assets/images/accessories/wd_external_hdd_02.jpg",
      "assets/images/accessories/wd_external_hdd_04.jpg"
    ],
    description: "Lưu trữ tài liệu và hình ảnh an toàn với phần mềm WD Backup tự động và mã hóa phần cứng AES 256-bit.",
    specs: {
      type: "Ổ cứng gắn ngoài HDD 2.5 inch",
      connectivity: "USB 3.2 Gen 1 (Tương thích USB 2.0)",
      color: "Đen",
      compatibility: "Windows, macOS (cần định dạng)",
      weight: "210 g"
    }
  },
  {
    id: 14,
    name: "Ổ cứng di động Seagate One Touch 2TB",
    categoryId: 3,
    categoryName: "Accessories",
    categorySlug: "accessory",
    brand: "SEAGATE",
    price: 2200000,
    originalPrice: 2550000,
    discountPercent: 13,
    stock: 28,
    soldCount: 160,
    rating: 4.7,
    reviewCount: 56,
    badge: "Kèm Rescue",
    image: "assets/images/accessories/seagate_external_hdd_01.jpg",
    gallery: [
      "assets/images/accessories/seagate_external_hdd_01.jpg",
      "assets/images/accessories/seagate_external_hdd_03.jpg"
    ],
    description: "Vỏ nhôm xước thời trang, tặng kèm dịch vụ phục hồi dữ liệu chuyên nghiệp Seagate Rescue Data Recovery.",
    specs: {
      type: "Ổ cứng di động 2.5 inch",
      connectivity: "USB 3.0",
      color: "Bạc",
      compatibility: "Windows và Mac",
      weight: "148 g"
    }
  },
  {
    id: 15,
    name: "Củ sạc nhanh Baseus GaN3 Pro 65W Desktop Charger",
    categoryId: 3,
    categoryName: "Accessories",
    categorySlug: "accessory",
    brand: "BASEUS",
    price: 850000,
    originalPrice: 1050000,
    discountPercent: 19,
    stock: 40,
    soldCount: 260,
    rating: 4.7,
    reviewCount: 92,
    badge: "Bàn làm việc",
    image: "assets/images/accessories/baseus_charger_01.jpg",
    gallery: [
      "assets/images/accessories/baseus_charger_01.jpg",
      "assets/images/accessories/baseus_charger_03.jpg"
    ],
    description: "Trạm sạc để bàn đa năng 4 cổng (2C + 2A) có dây nguồn 1.5m tiện lợi cho văn phòng và bàn làm việc hiện đại.",
    specs: {
      type: "Trạm sạc để bàn 65W",
      connectivity: "2x Type-C, 2x USB-A",
      color: "Đen mờ",
      compatibility: "Đa thiết bị",
      weight: "238 g"
    }
  }
];

const VOUCHERS = [
  {
    id: 1,
    code: "TECHZONE10",
    discountType: "PERCENT",
    discountValue: 10,
    minOrderValue: 500000,
    description: "Giảm 10% tối đa cho đơn từ 500.000₫",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    maxUsage: 100,
    usedCount: 38
  },
  {
    id: 2,
    code: "SUMMER500K",
    discountType: "FIXED",
    discountValue: 500000,
    minOrderValue: 2000000,
    description: "Giảm trực tiếp 500.000₫ cho đơn từ 2.000.000₫",
    startDate: "2026-06-01",
    endDate: "2026-09-30",
    maxUsage: 50,
    usedCount: 21
  },
  {
    id: 3,
    code: "WELCOME100K",
    discountType: "FIXED",
    discountValue: 100000,
    minOrderValue: 300000,
    description: "Giảm ngay 100.000₫ cho khách hàng mới",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    maxUsage: 200,
    usedCount: 145
  },
  {
    id: 4,
    code: "VIP1000K",
    discountType: "FIXED",
    discountValue: 1000000,
    minOrderValue: 10000000,
    description: "Giảm 1.000.000₫ cho đơn hàng Laptop/Điện thoại từ 10.000.000₫",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    maxUsage: 30,
    usedCount: 12
  }
];

const SAMPLE_ORDERS = [
  {
    orderId: 101,
    orderCode: "TZ-9821",
    orderTime: "2026-09-18 14:32:00",
    status: "COMPLETED", // PROCESSING, PENDING, COMPLETED, CANCELED
    statusLabel: "Hoàn thành",
    shippingAddress: "Số 45, Đường Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    recipientName: "Võ Thành Đạt",
    recipientPhone: "0912345678",
    paymentMethod: "COD",
    shippingFee: 150000,
    voucherId: 1,
    voucherCode: "TECHZONE10",
    voucherDiscount: 119000,
    subtotal: 1190000,
    totalAmount: 1221000,
    items: [
      {
        productId: 10,
        productName: "Củ sạc nhanh Anker 735 GaNPrime 65W A2668",
        productPrice: 1190000,
        quantity: 1,
        image: "assets/images/accessories/anker_charger_04.jpg"
      }
    ]
  },
  {
    orderId: 102,
    orderCode: "TZ-8412",
    orderTime: "2026-09-20 09:15:00",
    status: "PENDING",
    statusLabel: "Đang giao hàng",
    shippingAddress: "Toà nhà FPT Software, Khu Công nghệ cao, TP. Thủ Đức, TP. Hồ Chí Minh",
    recipientName: "Võ Thành Đạt",
    recipientPhone: "0912345678",
    paymentMethod: "BANK",
    shippingFee: 150000,
    voucherId: 2,
    voucherCode: "SUMMER500K",
    voucherDiscount: 500000,
    subtotal: 29490000,
    totalAmount: 29140000,
    items: [
      {
        productId: 6,
        productName: "iPhone 15 Pro Max 256GB Titan Tự Nhiên",
        productPrice: 29490000,
        quantity: 1,
        image: "assets/images/phones/iphone_01.jpg"
      }
    ]
  },
  {
    orderId: 103,
    orderCode: "TZ-7731",
    orderTime: "2026-09-21 16:45:00",
    status: "PROCESSING",
    statusLabel: "Chờ xác nhận",
    shippingAddress: "123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh",
    recipientName: "Võ Thành Đạt",
    recipientPhone: "0912345678",
    paymentMethod: "COD",
    shippingFee: 150000,
    voucherId: null,
    voucherCode: null,
    voucherDiscount: 0,
    subtotal: 3890000,
    totalAmount: 4040000,
    items: [
      {
        productId: 12,
        productName: "Tai nghe Gaming Logitech G Pro X Wireless Lightspeed",
        productPrice: 3890000,
        quantity: 1,
        image: "assets/images/accessories/logitech_headset_02.jpg"
      }
    ]
  },
  {
    orderId: 104,
    orderCode: "TZ-6109",
    orderTime: "2026-09-10 11:20:00",
    status: "CANCELED",
    statusLabel: "Đã hủy",
    cancelReason: "Khách hàng đổi ý muốn đổi sang phiên bản màu sắc khác",
    shippingAddress: "Số 45, Đường Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    recipientName: "Võ Thành Đạt",
    recipientPhone: "0912345678",
    paymentMethod: "BANK",
    shippingFee: 150000,
    voucherId: null,
    voucherCode: null,
    voucherDiscount: 0,
    subtotal: 19490000,
    totalAmount: 19640000,
    items: [
      {
        productId: 4,
        productName: "ASUS TUF Gaming F15 FX507ZC4",
        productPrice: 19490000,
        quantity: 1,
        image: "assets/images/laptops/tuf_01.jpg"
      }
    ]
  }
];

const SAMPLE_REVIEWS = [
  {
    id: 1,
    productId: 6,
    author: "Nguyễn Hoàng Nam",
    rating: 5,
    date: "2026-09-15 10:30",
    verified: true,
    content: "Máy cầm rất nhẹ tay do viền titan, màn hình 120Hz mượt mà đỉnh cao. Đóng gói cẩn thận, giao hàng siêu nhanh trong 2 ngày!",
    adminReply: {
      author: "Admin TechZone",
      date: "2026-09-15 14:10",
      content: "TechZone chân thành cảm ơn bạn Nam đã tin tưởng ủng hộ sản phẩm. Chúc bạn có những trải nghiệm tuyệt vời cùng iPhone 15 Pro Max ạ!"
    }
  },
  {
    id: 2,
    productId: 6,
    author: "Trần Mai Phương",
    rating: 5,
    date: "2026-09-12 18:45",
    verified: true,
    content: "Camera chụp zoom 5x cực kỳ sắc nét, màu sắc chân thực. Nhân viên tư vấn nhiệt tình, voucher giảm giá áp dụng mượt mà.",
    adminReply: null
  },
  {
    id: 3,
    productId: 1,
    author: "Lê Minh Trí",
    rating: 5,
    date: "2026-09-16 09:20",
    verified: true,
    content: "Chiến Black Myth: Wukong mượt mà 80-90 FPS ở độ phân giải 2K. Màn hình 240Hz màu sắc rực rỡ, bàn phím gõ rất nảy.",
    adminReply: {
      author: "Admin TechZone",
      date: "2026-09-16 11:00",
      content: "Cảm ơn bạn Trí! Dòng Predator Helios tản nhiệt kim loại lỏng cực kỳ ổn định cho các tựa game nặng. Cần hỗ trợ cài đặt gì bạn cứ nhắn TechZone nhé!"
    }
  },
  {
    id: 4,
    productId: 10,
    author: "Đặng Quang Huy",
    rating: 5,
    date: "2026-09-19 15:10",
    verified: true,
    content: "Củ sạc nhỏ gọn vừa vặn túi xách, sạc cùng lúc cả MacBook Air và iPhone mà củ sạc chỉ hơi ấm nhẹ. Rất đáng đồng tiền bát gạo!",
    adminReply: null
  }
];

const CURRENT_USER = {
  id: 1,
  username: "thanhdat",
  fullname: "Võ Thành Đạt",
  email: "thanhdat@gmail.com",
  phone: "0912345678",
  role: "User",
  avatar: "assets/images/accessories/One-piece-brook.png"
};

const ADMIN_USER = {
  id: 99,
  username: "admin",
  fullname: "Quản Trị Viên TechZone",
  email: "admin@techzone.vn",
  phone: "0916973161",
  role: "Admin"
};
