/**
 * TechZone Modern E-Commerce - Product Catalog & Detail Page Logic
 */

// Generate standard product card HTML
function createProductCardHTML(product, relativePathPrefix = "") {
  const isOutOfStock = product.stock <= 0;
  const imageSrc = `${relativePathPrefix}${product.image}`;
  const detailLink = `${relativePathPrefix}pages/product-detail.html?id=${product.id}`;

  return `
    <div class="col">
      <div class="product-card">
        <div class="product-badge-group">
          ${product.discountPercent > 0 ? `<span class="badge-sale">-${product.discountPercent}%</span>` : ""}
          ${product.badge ? `<span class="badge-tag">${product.badge}</span>` : ""}
          ${isOutOfStock ? `<span class="badge-outstock">Hết hàng</span>` : ""}
        </div>

        <div class="image-wrapper">
          <a href="${detailLink}">
            <img src="${imageSrc}" alt="${product.name}" loading="lazy" onerror="this.src='https://placehold.co/400x400?text=TechZone'">
          </a>
        </div>

        <div class="card-body">
          <div class="product-category">${product.brand || product.categoryName}</div>
          <h3 class="product-title line-clamp-2">
            <a href="${detailLink}">${product.name}</a>
          </h3>

          <div class="product-rating">
            <i class="bi bi-star-fill"></i>
            <span>${product.rating.toFixed(1)}</span>
            <span class="sold-count">• Đã bán ${product.soldCount}</span>
          </div>

          <div class="price-row">
            <span class="current-price">${formatVND(product.price)}</span>
            ${product.originalPrice > product.price ? `<span class="price-original">${formatVND(product.originalPrice)}</span>` : ""}
          </div>

          <button type="button" class="btn-add-cart mt-auto" onclick="addToCart(${product.id})" ${isOutOfStock ? "disabled" : ""}>
            <i class="bi bi-cart-plus fs-5"></i>
            <span>${isOutOfStock ? "Tạm hết hàng" : "Thêm vào giỏ"}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// CATALOG PAGE LOGIC (pages/products.html)
// ==========================================
let currentFilterState = {
  category: null,
  brands: [],
  priceRange: "all", // all, under-5m, 5m-15m, 15m-30m, over-30m
  inStockOnly: false,
  sortBy: "featured",
  searchKeyword: "",
  page: 1,
  pageSize: 9
};

function initCatalogPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const catSlug = urlParams.get("category");
  const searchQuery = urlParams.get("search");

  if (catSlug) currentFilterState.category = catSlug;
  if (searchQuery) currentFilterState.searchKeyword = searchQuery;

  renderCategoryPills();
  renderBrandCheckboxes();
  applyFiltersAndRender();
  setupFilterListeners();
}

function renderCategoryPills() {
  const container = document.getElementById("category-pills");
  if (!container) return;

  let html = `
    <button class="btn btn-sm rounded-pill px-3 fw-semibold ${!currentFilterState.category ? 'btn-primary' : 'btn-outline-secondary'}" 
            onclick="setCategoryFilter(null)">
      Tất cả (${PRODUCTS.length})
    </button>
  `;

  CATEGORIES.forEach(cat => {
    const isActive = currentFilterState.category === cat.slug;
    const count = PRODUCTS.filter(p => p.categoryId === cat.id).length;
    html += `
      <button class="btn btn-sm rounded-pill px-3 fw-semibold ${isActive ? 'btn-primary' : 'btn-outline-secondary'}" 
              onclick="setCategoryFilter('${cat.slug}')">
        ${cat.name} (${count})
      </button>
    `;
  });

  container.innerHTML = html;
}

function renderBrandCheckboxes() {
  const container = document.getElementById("brand-filter-list");
  if (!container) return;

  // Gather brands based on selected category or all
  let availableBrands = new Set();
  PRODUCTS.forEach(p => {
    if (!currentFilterState.category || p.categorySlug === currentFilterState.category) {
      if (p.brand) availableBrands.add(p.brand);
    }
  });

  let html = "";
  Array.from(availableBrands).sort().forEach(brand => {
    const isChecked = currentFilterState.brands.includes(brand);
    const count = PRODUCTS.filter(p => p.brand === brand && (!currentFilterState.category || p.categorySlug === currentFilterState.category)).length;

    html += `
      <div class="form-check mb-2">
        <input class="form-check-input brand-checkbox" type="checkbox" value="${brand}" id="brand-${brand}" 
               ${isChecked ? 'checked' : ''} onchange="toggleBrandFilter('${brand}', this.checked)">
        <label class="form-check-label d-flex justify-content-between" for="brand-${brand}">
          <span>${brand}</span>
          <span class="text-muted small">(${count})</span>
        </label>
      </div>
    `;
  });

  container.innerHTML = html || '<p class="text-muted small">Không có thương hiệu phù hợp</p>';
}

function setCategoryFilter(slug) {
  currentFilterState.category = slug;
  currentFilterState.brands = []; // Reset brand filter on category change
  currentFilterState.page = 1;
  renderCategoryPills();
  renderBrandCheckboxes();
  applyFiltersAndRender();
}

function toggleBrandFilter(brand, isChecked) {
  if (isChecked) {
    if (!currentFilterState.brands.includes(brand)) currentFilterState.brands.push(brand);
  } else {
    currentFilterState.brands = currentFilterState.brands.filter(b => b !== brand);
  }
  currentFilterState.page = 1;
  applyFiltersAndRender();
}

function applyFiltersAndRender() {
  let filtered = [...PRODUCTS];

  // 1. Category Filter
  if (currentFilterState.category) {
    filtered = filtered.filter(p => p.categorySlug === currentFilterState.category);
  }

  // 2. Brand Filter
  if (currentFilterState.brands.length > 0) {
    filtered = filtered.filter(p => currentFilterState.brands.includes(p.brand));
  }

  // 3. Price Range Filter
  if (currentFilterState.priceRange !== "all") {
    switch (currentFilterState.priceRange) {
      case "under-5m":
        filtered = filtered.filter(p => p.price < 5000000);
        break;
      case "5m-15m":
        filtered = filtered.filter(p => p.price >= 5000000 && p.price <= 15000000);
        break;
      case "15m-30m":
        filtered = filtered.filter(p => p.price > 15000000 && p.price <= 30000000);
        break;
      case "over-30m":
        filtered = filtered.filter(p => p.price > 30000000);
        break;
    }
  }

  // 4. In Stock Filter
  if (currentFilterState.inStockOnly) {
    filtered = filtered.filter(p => p.stock > 0);
  }

  // 5. Search Keyword
  if (currentFilterState.searchKeyword) {
    const kw = currentFilterState.searchKeyword.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(kw) || 
      p.brand.toLowerCase().includes(kw) ||
      p.categoryName.toLowerCase().includes(kw)
    );
  }

  // 6. Sorting
  switch (currentFilterState.sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered.sort((a, b) => b.id - a.id);
      break;
    default: // "featured"
      filtered.sort((a, b) => b.soldCount - a.soldCount);
  }

  // Update Result Count Label
  const countEl = document.getElementById("search-results-count");
  if (countEl) {
    countEl.textContent = `${filtered.length} sản phẩm phù hợp`;
  }

  // Active filter tags
  renderActiveFilterTags();

  // Pagination Slicing
  const totalPages = Math.ceil(filtered.length / currentFilterState.pageSize) || 1;
  if (currentFilterState.page > totalPages) currentFilterState.page = 1;
  const startIndex = (currentFilterState.page - 1) * currentFilterState.pageSize;
  const paginatedProducts = filtered.slice(startIndex, startIndex + currentFilterState.pageSize);

  // Render Grid
  const grid = document.getElementById("products-catalog-grid");
  if (grid) {
    if (paginatedProducts.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-search text-muted fs-1 d-block mb-3"></i>
          <h5 class="fw-bold">Không tìm thấy sản phẩm nào</h5>
          <p class="text-muted">Vui lòng thử điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
          <button class="btn btn-outline-primary rounded-pill px-4 mt-2" onclick="resetAllFilters()">
            Xóa tất cả bộ lọc
          </button>
        </div>
      `;
    } else {
      grid.innerHTML = paginatedProducts.map(p => createProductCardHTML(p, "../")).join("");
    }
  }

  // Render Pagination
  renderPagination(totalPages);
}

function renderActiveFilterTags() {
  const container = document.getElementById("active-filters-bar");
  if (!container) return;

  const tags = [];
  if (currentFilterState.category) {
    const cat = CATEGORIES.find(c => c.slug === currentFilterState.category);
    if (cat) tags.push({ label: `Danh mục: ${cat.name}`, onRemove: () => setCategoryFilter(null) });
  }

  currentFilterState.brands.forEach(b => {
    tags.push({ label: `Hãng: ${b}`, onRemove: () => toggleBrandFilter(b, false) });
  });

  if (currentFilterState.priceRange !== "all") {
    const rangeLabels = {
      "under-5m": "Dưới 5 triệu",
      "5m-15m": "5 - 15 triệu",
      "15m-30m": "15 - 30 triệu",
      "over-30m": "Trên 30 triệu"
    };
    tags.push({ label: `Giá: ${rangeLabels[currentFilterState.priceRange]}`, onRemove: () => {
      currentFilterState.priceRange = "all";
      document.querySelector("input[name='priceRange'][value='all']").checked = true;
      applyFiltersAndRender();
    }});
  }

  if (currentFilterState.searchKeyword) {
    tags.push({ label: `Từ khóa: "${currentFilterState.searchKeyword}"`, onRemove: () => {
      currentFilterState.searchKeyword = "";
      applyFiltersAndRender();
    }});
  }

  if (tags.length === 0) {
    container.innerHTML = "";
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";
  container.innerHTML = `
    <span class="small text-muted me-2 align-self-center">Đang lọc:</span>
    ${tags.map((t, idx) => `
      <span class="badge bg-light text-dark border d-inline-flex align-items-center gap-2 py-2 px-3 rounded-pill">
        ${t.label}
        <i class="bi bi-x-circle-fill text-muted cursor-pointer" onclick="tagsRemoveAction(${idx})" style="cursor: pointer;"></i>
      </span>
    `).join("")}
    <button class="btn btn-link btn-sm text-danger text-decoration-none ms-2 p-0" onclick="resetAllFilters()">Xóa tất cả</button>
  `;

  window._activeTags = tags;
}

function tagsRemoveAction(idx) {
  if (window._activeTags && window._activeTags[idx]) {
    window._activeTags[idx].onRemove();
  }
}

function resetAllFilters() {
  currentFilterState = {
    category: null,
    brands: [],
    priceRange: "all",
    inStockOnly: false,
    sortBy: "featured",
    searchKeyword: "",
    page: 1,
    pageSize: 9
  };
  const priceAll = document.querySelector("input[name='priceRange'][value='all']");
  if (priceAll) priceAll.checked = true;
  const stockCheck = document.getElementById("in-stock-only");
  if (stockCheck) stockCheck.checked = false;
  renderCategoryPills();
  renderBrandCheckboxes();
  applyFiltersAndRender();
}

function renderPagination(totalPages) {
  const container = document.getElementById("catalog-pagination");
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = `
    <li class="page-item ${currentFilterState.page === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="changeCatalogPage(${currentFilterState.page - 1}); return false;">
        <i class="bi bi-chevron-left"></i>
      </a>
    </li>
  `;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <li class="page-item ${currentFilterState.page === i ? 'active' : ''}">
        <a class="page-link" href="#" onclick="changeCatalogPage(${i}); return false;">${i}</a>
      </li>
    `;
  }

  html += `
    <li class="page-item ${currentFilterState.page === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="changeCatalogPage(${currentFilterState.page + 1}); return false;">
        <i class="bi bi-chevron-right"></i>
      </a>
    </li>
  `;

  container.innerHTML = html;
}

function changeCatalogPage(page) {
  currentFilterState.page = page;
  applyFiltersAndRender();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupFilterListeners() {
  // Sort select
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentFilterState.sortBy = e.target.value;
      currentFilterState.page = 1;
      applyFiltersAndRender();
    });
  }

  // Price radios
  const priceRadios = document.querySelectorAll("input[name='priceRange']");
  priceRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      currentFilterState.priceRange = e.target.value;
      currentFilterState.page = 1;
      applyFiltersAndRender();
    });
  });

  // Stock checkbox
  const stockCheck = document.getElementById("in-stock-only");
  if (stockCheck) {
    stockCheck.addEventListener("change", (e) => {
      currentFilterState.inStockOnly = e.target.checked;
      currentFilterState.page = 1;
      applyFiltersAndRender();
    });
  }
}

// ==========================================
// PRODUCT DETAIL PAGE LOGIC
// ==========================================
function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id")) || 1;
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  renderProductDetails(product);
  renderProductSpecs(product);
  renderProductReviews(product);
  renderRelatedProducts(product);
}

function renderProductDetails(product) {
  // Breadcrumb & Titles
  const titleEl = document.getElementById("detail-product-name");
  if (titleEl) titleEl.textContent = product.name;
  const catEl = document.getElementById("detail-category-link");
  if (catEl) {
    catEl.textContent = product.categoryName;
    catEl.href = `products.html?category=${product.categorySlug}`;
  }

  // Pricing
  const priceEl = document.getElementById("detail-price");
  if (priceEl) priceEl.textContent = formatVND(product.price);
  const origPriceEl = document.getElementById("detail-orig-price");
  if (origPriceEl) {
    if (product.originalPrice > product.price) {
      origPriceEl.textContent = formatVND(product.originalPrice);
      origPriceEl.style.display = "inline";
    } else {
      origPriceEl.style.display = "none";
    }
  }
  const discountBadge = document.getElementById("detail-discount-badge");
  if (discountBadge) {
    if (product.discountPercent > 0) {
      discountBadge.textContent = `-${product.discountPercent}%`;
      discountBadge.style.display = "inline-block";
    } else {
      discountBadge.style.display = "none";
    }
  }

  // Rating & Sold
  const ratingVal = document.getElementById("detail-rating-val");
  if (ratingVal) ratingVal.textContent = product.rating.toFixed(1);
  const soldVal = document.getElementById("detail-sold-val");
  if (soldVal) soldVal.textContent = product.soldCount;
  const reviewCountVal = document.getElementById("detail-review-count-val");
  if (reviewCountVal) reviewCountVal.textContent = product.reviewCount;

  // Stock status
  const stockEl = document.getElementById("detail-stock-status");
  if (stockEl) {
    if (product.stock > 0) {
      stockEl.innerHTML = `<span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill"><i class="bi bi-check2-circle me-1"></i>Còn hàng (${product.stock} sản phẩm)</span>`;
    } else {
      stockEl.innerHTML = `<span class="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 rounded-pill"><i class="bi bi-x-circle me-1"></i>Tạm hết hàng</span>`;
    }
  }

  // Description
  const descEl = document.getElementById("detail-description");
  if (descEl) descEl.textContent = product.description;

  // Main Image & Thumbnails
  const mainImg = document.getElementById("detail-main-img");
  if (mainImg) {
    mainImg.src = `../${product.image}`;
    mainImg.alt = product.name;
  }

  const thumbContainer = document.getElementById("detail-thumbnail-container");
  if (thumbContainer && product.gallery) {
    thumbContainer.innerHTML = product.gallery.map((img, idx) => `
      <div class="col-3">
        <div class="border rounded p-1 cursor-pointer thumb-item ${idx === 0 ? 'border-primary' : ''}" 
             style="cursor: pointer;" onclick="switchMainImage('../${img}', this)">
          <img src="../${img}" alt="Thumbnail ${idx + 1}" class="img-fluid rounded" style="height: 70px; width: 100%; object-fit: contain;">
        </div>
      </div>
    `).join("");
  }

  // Buttons state
  const btnAddToCart = document.getElementById("btn-detail-add-cart");
  const btnBuyNow = document.getElementById("btn-detail-buy-now");
  if (product.stock <= 0) {
    if (btnAddToCart) btnAddToCart.disabled = true;
    if (btnBuyNow) btnBuyNow.disabled = true;
  } else {
    if (btnAddToCart) {
      btnAddToCart.onclick = () => {
        const qty = parseInt(document.getElementById("detail-quantity").value) || 1;
        addToCart(product.id, qty);
      };
    }
    if (btnBuyNow) {
      btnBuyNow.onclick = () => {
        const qty = parseInt(document.getElementById("detail-quantity").value) || 1;
        addToCart(product.id, qty, true);
        window.location.href = "checkout.html";
      };
    }
  }
}

function switchMainImage(src, thumbEl) {
  const mainImg = document.getElementById("detail-main-img");
  if (mainImg) mainImg.src = src;

  document.querySelectorAll(".thumb-item").forEach(el => el.classList.remove("border-primary"));
  if (thumbEl) thumbEl.classList.add("border-primary");
}

function renderProductSpecs(product) {
  const table = document.getElementById("detail-specs-table");
  if (!table || !product.specs) return;

  let html = "";
  for (const [key, value] of Object.entries(product.specs)) {
    const keyLabels = {
      cpu: "Vi xử lý (CPU)",
      ram: "Bộ nhớ trong (RAM)",
      storage: "Ổ cứng lưu trữ",
      gpu: "Card đồ họa (GPU)",
      display: "Màn hình",
      screen: "Kích thước màn hình",
      cam: "Camera",
      battery: "Dung lượng Pin",
      os: "Hệ điều hành",
      weight: "Trọng lượng",
      type: "Loại phụ kiện",
      connectivity: "Kết nối",
      color: "Màu sắc",
      compatibility: "Tương thích"
    };

    html += `
      <tr>
        <th class="bg-light" style="width: 30%;">${keyLabels[key] || key.toUpperCase()}</th>
        <td>${value}</td>
      </tr>
    `;
  }

  table.innerHTML = html;
}

function renderProductReviews(product) {
  const container = document.getElementById("detail-reviews-list");
  if (!container) return;

  const reviews = SAMPLE_REVIEWS.filter(r => r.productId === product.id);
  if (reviews.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4 text-muted">
        <i class="bi bi-chat-dots fs-1 d-block mb-2"></i>
        Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên trải nghiệm và chia sẻ!
      </div>
    `;
    return;
  }

  container.innerHTML = reviews.map(r => `
    <div class="card mb-3 border-0 bg-light-surface rounded-3 p-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div>
          <span class="fw-bold text-dark">${r.author}</span>
          ${r.verified ? '<span class="badge bg-success-subtle text-success ms-2"><i class="bi bi-check2"></i> Đã mua hàng</span>' : ''}
        </div>
        <small class="text-muted">${r.date}</small>
      </div>

      <div class="text-warning mb-2">
        ${Array.from({ length: r.rating }).map(() => '<i class="bi bi-star-fill"></i>').join("")}
      </div>

      <p class="mb-2 text-dark fs-6">${r.content}</p>

      ${r.adminReply ? `
        <div class="p-3 mt-2 bg-white rounded-3 border-start border-primary border-4">
          <div class="d-flex justify-content-between">
            <strong class="text-primary">${r.adminReply.author}</strong>
            <small class="text-muted">${r.adminReply.date}</small>
          </div>
          <p class="mb-0 text-secondary mt-1 small">${r.adminReply.content}</p>
        </div>
      ` : ''}
    </div>
  `).join("");
}

function renderRelatedProducts(product) {
  const container = document.getElementById("detail-related-grid");
  if (!container) return;

  const related = PRODUCTS.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  container.innerHTML = related.map(p => createProductCardHTML(p, "../")).join("");
}

function handleQuantityStep(delta) {
  const input = document.getElementById("detail-quantity");
  if (!input) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id")) || 1;
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  let val = parseInt(input.value) || 1;
  val += delta;
  if (val < 1) val = 1;
  if (val > product.stock) {
    showToast(`Kho chỉ còn ${product.stock} sản phẩm!`, "warning");
    val = product.stock;
  }
  input.value = val;
}
