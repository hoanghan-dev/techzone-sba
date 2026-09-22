/**
 * TechZone Modern E-Commerce - Cart & Checkout Engine
 * Manages shopping cart state in localStorage and checkout calculations.
 */

const CART_STORAGE_KEY = "techzone_cart";
const ORDERS_STORAGE_KEY = "techzone_orders";
const SHIPPING_FEE = 150000; // Flat shipping rate from business logic

// Retrieve cart from localStorage or initialize with sample items
function getCart() {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }

  // Initial demo cart items
  const initialCart = [
    {
      cartItemId: 1001,
      productId: 10,
      product: PRODUCTS.find(p => p.id === 10),
      quantity: 1,
      selected: true
    },
    {
      cartItemId: 1002,
      productId: 12,
      product: PRODUCTS.find(p => p.id === 12),
      quantity: 1,
      selected: true
    }
  ];
  saveCart(initialCart);
  return initialCart;
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// Add product to cart
function addToCart(productId, quantity = 1, silent = false) {
  const product = PRODUCTS.find(p => p.id === parseInt(productId));
  if (!product) {
    if (!silent) showToast("Không tìm thấy sản phẩm!", "danger");
    return false;
  }

  if (product.stock <= 0) {
    if (!silent) showToast("Sản phẩm đã hết hàng!", "warning");
    return false;
  }

  const cart = getCart();
  const existingItem = cart.find(item => item.productId === product.id);

  if (existingItem) {
    const newQty = existingItem.quantity + quantity;
    if (newQty > product.stock) {
      if (!silent) showToast(`Chỉ còn ${product.stock} sản phẩm trong kho!`, "warning");
      existingItem.quantity = product.stock;
    } else {
      existingItem.quantity = newQty;
    }
  } else {
    cart.push({
      cartItemId: Date.now(),
      productId: product.id,
      product: product,
      quantity: Math.min(quantity, product.stock),
      selected: true
    });
  }

  saveCart(cart);
  if (!silent) {
    showToast(`Đã thêm <b>${product.name}</b> vào giỏ hàng!`, "success");
  }
  return true;
}

// Update single item quantity
function updateCartItemQuantity(cartItemId, newQty) {
  const cart = getCart();
  const item = cart.find(i => i.cartItemId === cartItemId);
  if (!item) return;

  if (newQty <= 0) {
    removeCartItem(cartItemId);
    return;
  }

  const product = PRODUCTS.find(p => p.id === item.productId);
  if (product && newQty > product.stock) {
    showToast(`Rất tiếc, kho chỉ còn ${product.stock} sản phẩm!`, "warning");
    item.quantity = product.stock;
  } else {
    item.quantity = newQty;
  }

  saveCart(cart);
  renderCartPage();
}

// Remove single item from cart
function removeCartItem(cartItemId) {
  let cart = getCart();
  const removedItem = cart.find(i => i.cartItemId === cartItemId);
  cart = cart.filter(i => i.cartItemId !== cartItemId);
  saveCart(cart);
  renderCartPage();
  if (removedItem) {
    showToast(`Đã xóa <b>${removedItem.product.name}</b> khỏi giỏ hàng`, "info");
  }
}

// Delete selected items
function removeSelectedCartItems() {
  let cart = getCart();
  const selectedCount = cart.filter(i => i.selected).length;
  if (selectedCount === 0) {
    showToast("Vui lòng chọn ít nhất một sản phẩm để xóa!", "warning");
    return;
  }

  cart = cart.filter(i => !i.selected);
  saveCart(cart);
  renderCartPage();
  showToast(`Đã xóa ${selectedCount} sản phẩm đã chọn khỏi giỏ hàng`, "info");
}

// Toggle item selection
function toggleCartItemSelection(cartItemId, isSelected) {
  const cart = getCart();
  const item = cart.find(i => i.cartItemId === cartItemId);
  if (item) {
    item.selected = isSelected;
    saveCart(cart);
    renderCartPage();
  }
}

// Toggle select all
function toggleSelectAll(isSelected) {
  const cart = getCart();
  cart.forEach(item => (item.selected = isSelected));
  saveCart(cart);
  renderCartPage();
}

// Checkout Calculations
function calculateCartTotals() {
  const cart = getCart();
  const selectedItems = cart.filter(i => i.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItemsCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    selectedItems,
    subtotal,
    totalItemsCount
  };
}

// Render the interactive Cart Page
function renderCartPage() {
  const cartItemsContainer = document.getElementById("cart-items-list");
  if (!cartItemsContainer) return;

  const cart = getCart();
  const { selectedItems, subtotal, totalItemsCount } = calculateCartTotals();

  // Checkbox select all sync
  const selectAllHeader = document.getElementById("select-all-header");
  const selectAllFooter = document.getElementById("select-all-footer");
  const isAllSelected = cart.length > 0 && cart.every(i => i.selected);

  if (selectAllHeader) selectAllHeader.checked = isAllSelected;
  if (selectAllFooter) selectAllFooter.checked = isAllSelected;

  // Empty cart state
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="card p-5 text-center my-4 border-0 shadow-sm rounded-4">
        <div class="mb-3">
          <i class="bi bi-cart-x text-muted" style="font-size: 4rem;"></i>
        </div>
        <h4 class="fw-bold mb-2">Giỏ hàng của bạn đang trống</h4>
        <p class="text-muted mb-4">Hãy khám phá hàng trăm sản phẩm công nghệ đỉnh cao tại TechZone nhé!</p>
        <a href="products.html" class="btn btn-primary px-4 py-2 rounded-pill mx-auto">
          <i class="bi bi-arrow-left me-2"></i>Tiếp tục mua sắm
        </a>
      </div>
    `;
    const summaryCard = document.getElementById("cart-summary-section");
    if (summaryCard) summaryCard.style.display = "none";
    return;
  }

  // Render cart items
  const summaryCard = document.getElementById("cart-summary-section");
  if (summaryCard) summaryCard.style.display = "block";

  let html = "";
  cart.forEach(item => {
    const itemTotal = item.product.price * item.quantity;
    const isOutStock = item.product.stock <= 0;

    html += `
      <div class="card mb-3 border border-1 rounded-3 shadow-sm product-row ${!item.selected ? 'opacity-75' : ''}">
        <div class="card-body p-3">
          <div class="row align-items-center">
            <!-- Checkbox & Image -->
            <div class="col-12 col-md-5 d-flex align-items-center gap-3 mb-2 mb-md-0">
              <input type="checkbox" class="form-check-input mt-0 cart-item-check" 
                     ${item.selected ? 'checked' : ''} 
                     onchange="toggleCartItemSelection(${item.cartItemId}, this.checked)"
                     style="width: 20px; height: 20px; cursor: pointer;">
              <a href="product-detail.html?id=${item.product.id}" class="flex-shrink-0">
                <img src="../${item.product.image}" alt="${item.product.name}" 
                     class="rounded border" style="width: 76px; height: 76px; object-fit: contain;">
              </a>
              <div>
                <a href="product-detail.html?id=${item.product.id}" class="text-decoration-none text-dark fw-semibold line-clamp-2 fs-6">
                  ${item.product.name}
                </a>
                <small class="text-muted d-block mt-1">Thương hiệu: <span class="fw-semibold text-primary">${item.product.brand}</span></small>
                ${isOutStock ? '<span class="badge bg-danger mt-1">Tạm hết hàng</span>' : ''}
              </div>
            </div>

            <!-- Unit Price -->
            <div class="col-4 col-md-2 text-md-center">
              <div class="d-md-none text-muted small">Đơn giá:</div>
              <span class="fw-semibold text-dark">${formatVND(item.product.price)}</span>
            </div>

            <!-- Quantity Stepper -->
            <div class="col-4 col-md-2 text-center">
              <div class="quantity-stepper">
                <button type="button" onclick="updateCartItemQuantity(${item.cartItemId}, ${item.quantity - 1})">-</button>
                <input type="text" value="${item.quantity}" readonly>
                <button type="button" onclick="updateCartItemQuantity(${item.cartItemId}, ${item.quantity + 1})" ${item.quantity >= item.product.stock ? 'disabled' : ''}>+</button>
              </div>
            </div>

            <!-- Subtotal & Remove -->
            <div class="col-4 col-md-3 d-flex align-items-center justify-content-between justify-content-md-end gap-3">
              <div class="text-end">
                <div class="d-md-none text-muted small">Thành tiền:</div>
                <span class="price fs-6">${formatVND(itemTotal)}</span>
              </div>
              <button type="button" class="btn btn-link text-danger p-0 ms-2" title="Xóa sản phẩm" onclick="removeCartItem(${item.cartItemId})">
                <i class="bi bi-trash3 fs-5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = html;

  // Update Summary Elements
  const totalCountEl = document.getElementById("selected-count");
  const subtotalEl = document.getElementById("cart-subtotal");
  const btnCheckout = document.getElementById("btn-go-checkout");

  if (totalCountEl) totalCountEl.textContent = totalItemsCount;
  if (subtotalEl) subtotalEl.textContent = formatVND(subtotal);
  if (btnCheckout) {
    btnCheckout.disabled = totalItemsCount === 0;
  }
}

// Redirect to Checkout
function proceedToCheckout() {
  const { selectedItems } = calculateCartTotals();
  if (selectedItems.length === 0) {
    showToast("Vui lòng tích chọn ít nhất 1 sản phẩm để thanh toán!", "warning");
    return;
  }
  window.location.href = "checkout.html";
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();

  const selectAllHeader = document.getElementById("select-all-header");
  if (selectAllHeader) {
    selectAllHeader.addEventListener("change", (e) => toggleSelectAll(e.target.checked));
  }

  const selectAllFooter = document.getElementById("select-all-footer");
  if (selectAllFooter) {
    selectAllFooter.addEventListener("change", (e) => toggleSelectAll(e.target.checked));
  }
});
